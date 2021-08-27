import { NextApiHandler } from 'next';
const sequelize = require('@/db/index.js');
const path = require('path');
const fs = require('fs');

async function throughDirectory(dir) {
    const filepaths = fs.readdirSync(dir);
    let videolist = [];
    let files = [];
    for (const file of filepaths) {
        const absolute = path.join(dir, file);
        const stats = fs.statSync(absolute);
        if (stats.isDirectory()) {
            return throughDirectory(absolute);
        } else if (file.includes('.mp4')) {
            files.push(dir + '/' + file);
            videolist.push({ 
                file, 
                size: `${(stats.size/(1024*1024)).toFixed(2)}mb`,
                video_id: file.slice(0,file.length-4)
            });
        }
    }
    return {
        files,
        videolist
    };
}

export async function getDownloads() {
    const { files, videolist } = await throughDirectory("./public/data/");
    const videos = await sequelize.models.Video.findAll({
        where: {
            video_id: videolist.map(v => v.video_id)
        },
        raw: true
    });

    // for each download, append file data to the DB data
    videos.map((video, i) => {
        video['color'] = video['colors'].split(',')[0];
        video['file_size'] = videolist[i]['size'];
        video['file_name'] = videolist[i]['file'];
    })

    return { files, videos };
}

const handler: NextApiHandler = async (_, res) => {
    try {
        const data = await getDownloads();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler;