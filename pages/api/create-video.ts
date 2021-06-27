import { NextApiHandler } from 'next'
// import ytpl from 'ytpl'
import ytdl from 'ytdl-core';
const fs = require('fs');
const fetch = require('node-fetch');
const { sequelize, models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    // const results = await ytpl(req.body.video_url);

    // save thumbnail image to CDN
    // downloadThumbnailImage(req.body.thumbnail)
    // .then(downloadResult => {
    // get more video details, save to DB
    // });

    try {
        const results = getVideoDetails(req.body.video_url);
        // const video = await models.Video.create({
        //     title: results.videoDetails.title,
        //     views: playlist.views,
        //     avatar: bestAvatar.url,
        //     channel_id: channelID,
        //     channel_url: url
        // });

        // await downloadAvatar(channel);

        // await saveChannelVideos(videos)
        //     .then(() => {
        //         res.status(200).send(channel);
        //     });
        console.log(results);
        res.status(200).send(results);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// async function downloadThumbnailImage(channel) {
//     const response = await fetch(channel['avatar']);
//     const buffer = await response.buffer();
//     const dir = `./data/${channel.channel_id}`;
//     const image = `${dir}/${channel.channel_id}.jpg`;

//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//     }
//     fs.writeFile(image, buffer, () => { return; });
// }

export const getVideoDetails = async video_url => {
    return new Promise(function (resolve, reject) {

        // download the video
        ytdl.getInfo(video_url).then((info) => {
            console.log(info.player_response);

            if (info.player_response) {
                let video = {};
                video['description'] = info.player_response.videoDetails.shortDescription;
                video['view_count'] = info.player_response.videoDetails.viewCount;
                video['is_live_content'] = info.player_response.videoDetails.isLiveContent;
                // video['published'] = info.published;
                // video['category_url'] = info.media.category_url;
                // video['category'] = info.media.category;
                video['related_videos'] = info.related_videos;

                console.log('at this point, need to save this video data to DB:');
                console.log(video);

                resolve(video);

                // Video.findOneAndUpdate(
                //     { url_simple: video.url_simple },
                //     video,
                //     function(err, result) {
                //         if (err) console.log(err);

                //         resolve(info);
                // });
            } else {
                reject('error happened');
            }
        });
    });
};

export default handler
