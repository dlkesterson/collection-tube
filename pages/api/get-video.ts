import { NextApiHandler } from 'next';
import ytdl from 'ytdl-core';
const sequelize = require('@/db');
const { models } = require('@/db');
import saveChannelVideos from '@/lib/saveChannelVideos';

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.body
    try {
        return models.Video.findByPk(id)
            .then((video) => res.json(video))
            .catch((err) => {
                console.log('There was an error querying video', JSON.stringify(err))
                return res.send(err)
            });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export const getVideo = async (id) => {
    const video = await models.Video.findByPk(id);    

    if (video) {
        const latestInfo =  await ytdl.getInfo(video.video_url, {});
        // console.log(latestInfo);
        const updatedVideo = {
            ...video,
            description: latestInfo.player_response.videoDetails.shortDescription,
            view_count: latestInfo.player_response.videoDetails.viewCount
        }
        let transaction;

        if (!video['description']) {
            try {
                transaction = await sequelize.transaction();
        
                await models.Video.update(
                    updatedVideo,
                    {
                        where: {
                            video_id: video.video_id
                        }, transaction
                    },
                    function(err, result) {
                        if (err) console.log(err);
                });
                console.log(latestInfo.related_videos[0]);
                await saveChannelVideos(latestInfo.related_videos, transaction, false);
                await transaction.commit();
        
                return video;
            } catch (e) {
                if (transaction) await transaction.rollback();

                return { error: '404 - Not found' };
            }
        } else {
            console.log('we already have video info via getInfo, return video');
            return video;
        }
        
    } else {
        return { error: '404 - Not found' };
    }
};

export const getAllChannelVideos = async (channel_id) => {

    console.log('videos channel_id is ' + channel_id);

    const videos = await models.Video.findByPk(channel_id);
    if (videos) {
        return videos;
    } else {
        return { error: '404 - Not found' };
    }
};

export default handler