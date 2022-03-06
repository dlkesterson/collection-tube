
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

    try {
        video = await models.Video.findOne({ where: { video_id: id }});
        
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

                await models.Video.update(updatedVideo, {
                    where: {
                        video_id: video.video_id
                    }, transaction
                });
                    
                await transaction.commit();

                return res.json(updatedVideo);
            } catch (e) {
                console.log('error occurred', e);
                return res.json(video);
            }
        }
    } catch (e: any) {
        res.status(500).json({ message: e.message })
    }
}

export const getVideo = async (id: string) => {
    const video = await models.Video.findOne({ where: {video_id: id}});
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
                    (err: any) => err ? console.log(err) : null
                );
                    
                await transaction.commit();

                updatedVideo['related'] = info.related_videos;

                // TODO: format for status & data props
                return updatedVideo;
            } catch (e: any) {
				console.error(e.message);

                video['related'] = info.related_videos;

                // TODO: format for status & data props
                return video;
            }
        }
    } else {
        return { error: '404 - Not found' };
    }
};

export const getAllSubscriptionVideos = async (subscription_id: string) => {
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