const sequelize = require('@/db');
const { models } = require('@/db');
import { NextApiHandler } from 'next';
import ytdl from 'ytdl-core';

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

export default handler