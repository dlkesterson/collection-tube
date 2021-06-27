import { NextApiHandler } from 'next'
// import ytpl from 'ytpl'
import ytdl from 'ytdl-core';
const fs = require('fs');
// const fetch = require('node-fetch');
const { models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    console.log('in download video API request, ID passed is '+id);
    const { video_url, video_id, channel_id } = await models.Video.findByPk(id);
    const dir = `./public/data/${channel_id}`;
    const videoPath = `${dir}/${video_id}.mp4`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    console.log('downloading video ' + video_url);
    const downloadStream = ytdl(video_url);
    let downloadProgress = 0;
    let downloadSize = 0;

    downloadStream.on( 'response', function ( data ) {
        downloadSize = data.headers[ 'content-length' ];
        console.log( 'download size: ' + data.headers[ 'content-length' ] );
    } );

    downloadStream.on( 'data', function ( data ) {
        downloadProgress += data.length;

        console.log("Downloading " + (100.0 * downloadProgress / (downloadSize > 0 ? downloadSize : 1)) + "% " + (downloadProgress / 1048576).toFixed(2) + " mb\r" + ".<br/> Total size: " + downloadSize + " mb")
        res.send((downloadProgress / 1048576).toFixed(2));
    } );

    downloadStream
        .pipe(fs.createWriteStream(videoPath));

    downloadStream.on('end', function() {
        //Do something
        console.log('\n\ndownload finished!!!!!!!!\n\n');
        res.status(200).send({ ok:true, message: 'done!' });
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

export default handler
