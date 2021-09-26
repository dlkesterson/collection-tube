import { NextApiHandler } from 'next';
// const getVideoInfo = require('@/lib/getVideoInfo');
const ytdl = require('ytdl-core');
// const sequelize = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    try {
        ytdl(req.body.video_url).on('info', (info) => {
            res.status(200).send({
                details: {
                    title: info.videoDetails.title,
                    description: info.videoDetails.description,
                    lengthSeconds: info.videoDetails.lengthSeconds,
                    channelId: info.videoDetails.channelId,
                    viewCount: info.videoDetails.viewCount,
                    category: info.videoDetails.category,
                    publishDate: info.videoDetails.publishDate,
                    ownerChannelName: info.videoDetails.ownerChannelName,
                    uploadDate: info.videoDetails.uploadDate,
                    videoId: info.videoDetails.videoId,
                    keywords: info.videoDetails.keywords,
                    averageRating: info.videoDetails.averageRating,
                    likes: info.videoDetails.likes,
                    dislikes: info.videoDetails.dislikes
                },
                related: info.related_videos
            })
        });    
    } catch (e) {
        res.status(500).send({
            error: e
        });
    }
};

export default handler;
