
const fs = require('fs');
import { NextApiHandler } from 'next';
import ytdl from 'ytdl-core';
const sequelize = require('@/db');
const { models } = require('@/db');
const downloadImage = require('@/lib/downloadImage');
// import saveSubscriptionVideos from '@/lib/saveSubscriptionVideos';

const handler: NextApiHandler = async (req, res) => {
    let { id } = req.body;
    if (!id) id = req.query.id;
    let video, transaction;

    console.log('inside the serverless handler func');

    try {
        // if ID is string, query by video_id
        if (!isNumber(id)) {
            video = await models.Video.findOne({ where: { video_id: id }});
        } else {
            // ID is number, so query by primary key
            video = await models.Video.findByPk(id);
        }

        if (video.description) {
            res.json(video);
        } else {
            try {
                transaction = await sequelize.transaction();
                const info = await ytdl.getInfo(video.video_url);
                const updatedVideo = {
                    ...video.dataValues,
                    description: info.videoDetails.description,
                    view_count: info.videoDetails.viewCount
                };

                await models.Video.update(
                    // updated row
                    updatedVideo,
                    // options
                    {
                        where: {
                            video_id: video.video_id
                        }, transaction
                    });

                // video['related'] = info.related_videos;
                    
                await transaction.commit();

                console.log('returning the video as response');
                return res.json(updatedVideo);
            } catch (e) {
                console.log('error occurred', e);
                return res.json(video);
            }
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}


function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

export const getVideo = async (id) => {
    const video = await models.Video.findByPk(id);
    let transaction;

    if (video) {
        const subscriptionThumbnailPath = `./public/data/${video.subscription_id}/${video.subscription_id}.jpg`;
        const videoThumbnailPath = `./public/data/${video.subscription_id}/${video.video_id}.jpg`;
        // fetch info via ytdl
        const info = await ytdl.getInfo(video.video_url);

        // check if thumbnail image is downloaded
        if (!fs.existsSync(subscriptionThumbnailPath)) {
            const { avatar } = await models.Subscription.findOne({ where: { subscription_id: video.subscription_id } })
            await downloadImage(avatar, `${video.subscription_id}`, `${video.subscription_id}`);
        }
        if (!fs.existsSync(videoThumbnailPath)) {
            await downloadImage(video.thumbnail, `${video.subscription_id}`, `${video.video_id}`);
        }
        // videoId: 'GE2eGGiwx9s',
        // title: 'KILL TONY #510 - ALEX JONES',
        // lengthSeconds: '6971',
        // keywords: [Array],
        // subscriptionId: 'UCwzCMiicL-hBUzyjWiJaseg',
        // isOwnerViewing: false,
        // shortDescription: 'Alex Jones, Joe Rogan, Duncan Trussell, William Montgomery, Zac Bogus, Michael Lehrer, Matthew Muehling, Michael A. Gonzales, Yoni, Tony Hinchcliffe, Brian Redban – 06/07/2021',
        // isCrawlable: true,
        // thumbnail: [Object],
        // averageRating: 4.8401895,
        // allowRatings: true,
        // viewCount: '496720',
        // author: 'Kill Tony',
        // isLowLatencyLiveStream: false,
        // isPrivate: false,
        // isUnpluggedCorpus: false,
        // latencyClass: 'MDE_STREAM_OPTIMIZATIONS_RENDERER_LATENCY_NORMAL',
        // isLiveContent: false

        if (video.description) {
            // we have data, return it to client
            video['related'] = info.related_videos;
            video['keywords'] = info.videoDetails.keywords;
            // TODO: format for status & data props
            return video;
        } else {
            // grab some data, save it to DB, return it to client
            try {
                transaction = await sequelize.transaction();
                const updatedVideo = {
                    ...video.dataValues,
                    description: info.videoDetails.description,
                    view_count: info.videoDetails.viewCount
                };

                await models.Video.update(
                    // updated row
                    updatedVideo,
                    // options
                    {
                        where: {
                            video_id: video.video_id
                        }, transaction
                    },
                    err => err ? console.log(err) : null
                );
                    
                await transaction.commit();

                updatedVideo['related'] = info.related_videos;

                // TODO: format for status & data props
                return updatedVideo;
            } catch (e) {
                console.log('error occurred', e);

                video['related'] = info.related_videos;

                // TODO: format for status & data props
                return video;
            }
        }
    } else {
        return { error: '404 - Not found' };
    }
};

export const getAllSubscriptionVideos = async (subscription_id) => {
    const videos = await models.Video.findByPk(subscription_id);
    if (videos) {
        // TODO: format for status & data props
        return videos;
    } else {
        // TODO: format for status & data props
        return { error: '404 - Not found' };
    }
};

export default handler