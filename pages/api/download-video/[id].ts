import { NextApiHandler } from 'next';
// import ytpl from 'ytpl'
// const fetch = require('node-fetch');
import ytdl from 'ytdl-core';
const fs = require('fs');
const { models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    console.log('in download video API request, ID passed is ' + id);
    const video = await models.Video.findByPk(id);
    const updatedVideo = {
        ...video,
        downloaded: 1,
        downloadedAt: Math.floor((new Date()).getTime() / 1000)
    };
    const dir = `./public/data/${video.channel_id}`;
    const videoPath = `${dir}/${video.video_id}.mp4`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    console.log('downloading video ' + video.video_url);
    const downloadStream = ytdl(video.video_url);
    let downloadProgress = 0;
    let downloadSize = 0;

    downloadStream.on('response', function (data) {
        downloadSize = data.headers['content-length'];
        console.log('download size: ' + data.headers['content-length']);
    });

    downloadStream.on('data', function (data) {
        downloadProgress += data.length;
        console.log(
            `video #${id} is ${(
                (downloadProgress / downloadSize) *
                100
            ).toFixed(2)}% complete`
        );
    });

    downloadStream.pipe(fs.createWriteStream(videoPath));

    downloadStream.on('end', function () {
        //Do something
        console.log('\n\ndownload finished!!!!!!!!\n\n');

        models.Video.update(updatedVideo, {
            where: {
                id
            }
        });

        res.status(200).send({ ok: true, message: 'done!' });
    });

    // res.send(200).json({
    //     ok:true,
    //     message: 'done, but res send() sent OUTSIDE out of the download stream\'s End event'
    // });

    // try {

    // } catch (e) {
    //     res.status(500).json({ message: e.message });
    // }
};

// export const downloadvideo = async video_url => {
//     return new Promise(function (resolve, reject) {

//         // resolve(video);
//         // reject('error happened');
//     });
// };

export default handler;
