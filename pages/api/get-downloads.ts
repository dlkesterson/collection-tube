import { NextApiHandler } from 'next';
const { models } = require('@/db');
const path = require('path');
const fs = require('fs');
let videolist = [];
let files  = [];

function throughDirectory(dir) {
    // console.log('through dir: ' + dir);
    fs.readdirSync(dir).forEach(file => {
        // console.log(file);
        const absolute = path.join(dir, file);
        if (fs.statSync(absolute).isDirectory()) {
            return throughDirectory(absolute);
        } else if (file.includes('.mp4')) {
            // console.log('\n\nfile IS A VIDEEEOOOOOO: ' + file);
            files.push(dir + '/' + file);
            videolist.push(file);
        }
    });
}

const handler: NextApiHandler = async (_, res) => {
    let files  = [];
    try {
        throughDirectory("./public/data/");

        const videoIdList = videolist.map(file => {
            return file.slice(0,file.length-4);
        })

        console.log(videoIdList);

        const videoData = models.Video.findAll({
            where: {
                video_id: videoIdList
            }
        })

        console.log(videoData);

        res.status(200).send(videoData);

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler;

export async function getDownloads() {
    let files  = [];
        // const channels = models.Channel.findAll();
        // return channels;

        //joining path of directory 
        throughDirectory("./public/data/");

        const videoIdList = videolist.map(file => {
            return file.slice(0,file.length-4);
        });

        console.log(videoIdList);

        const videos = await models.Video.findAll({
            where: {
                video_id: videoIdList
            },
            raw: true
        });

        return { files, videoIdList, videos };
        // models.Video.findAll({
        //     where: {
        //         video_id: videoIdList
        //     }
        // })
        // .then((videos) => { 
        //     console.log(videos);
        //     console.log('found ' + videos.length + ' videos');
        //     return { files, videoIdList, videos } })
        // .catch((err) => {
        //     console.log('There was an error querying video', JSON.stringify(err))
        //     return err;
        // });
}