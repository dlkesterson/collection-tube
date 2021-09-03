
const sequelize = require('@/db/index.js');
const path = require('path');
const fs = require('fs');

async function* walk(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* walk(entry);
        else if (d.isFile()) yield entry;
    }
}

async function getDownloads() {
    let videolist = [];
    const dir = './public/data/';
    for await (const file of walk(dir)) {
        if (file.includes('.mp4')) {
            const stats = fs.statSync(file);
            const filename = file.split('/')[3];
            videolist.push({ 
                file: filename,
                path: file,
                size: `${(stats.size/(1024*1024)).toFixed(2)}mb`,
                video_id: filename.slice(0,filename.length-4),
            });
        }
    }
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
        video['file_path'] = videolist[i]['path'];
    })
    return { videos };
}

module.exports = getDownloads;