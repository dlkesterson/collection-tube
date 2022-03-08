const fs = require('fs');
const sequelize = require('@/db');
const downloadImage = require('@/lib/downloadImage');
import ytdl from 'ytdl-core';

export const getVideo = async (id: string) => {
    const video = await sequelize.models.Video.findOne({ where: {video_id: id}});
    let transaction;

    if (video) {
        const subscriptionThumbnailPath = `./public/data/${video.subscription_id}/${video.subscription_id}.jpg`;
        const videoThumbnailPath = `./public/data/${video.subscription_id}/${video.video_id}.jpg`;
        // fetch info via ytdl
        const info = await ytdl.getInfo(video.video_url);

        // check if thumbnail image is downloaded
        if (!fs.existsSync(subscriptionThumbnailPath)) {
            const { avatar } = await sequelize.models.Subscription.findOne({ where: { subscription_id: video.subscription_id } })
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

                await sequelize.models.Video.update(
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