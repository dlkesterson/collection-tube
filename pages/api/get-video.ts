import { NextApiHandler } from 'next';
import ytdl from 'ytdl-core';
const sequelize = require('@/db');
const { models } = require('@/db');
import saveChannelVideos from '@/lib/saveChannelVideos';

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
            console.log('video had a description: ' + video.description);
            res.json(video);
        } else {
            console.log('no video description found');
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
        console.log(video);
        const info = await ytdl.getInfo(video.video_url);
        if (video.description) {
            // we have data, return it to client
            video['related'] = info.related_videos;
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

                // TODO: format for status & data props
                return video;
            }
        }
    } else {
        return { error: '404 - Not found' };
    }
};

export const getAllChannelVideos = async (channel_id) => {
    const videos = await models.Video.findByPk(channel_id);
    if (videos) {
        // TODO: format for status & data props
        return videos;
    } else {
        // TODO: format for status & data props
        return { error: '404 - Not found' };
    }
};

export default handler