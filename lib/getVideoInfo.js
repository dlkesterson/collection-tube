const ytdl = require('ytdl-core');
const sequelize = require('@/db');

async function getVideoInfo(video_url) {
    try {
        ytdl(video_url).on('info', (info) => {
            const formattedResult = {
                details: {
                    title: info.videoDetails.title,
                    description: info.videoDetails.description,
                    lengthSeconds: info.videoDetails.lengthSeconds,
                    subscriptionId: info.videoDetails.subscriptionId,
                    viewCount: info.videoDetails.viewCount,
                    category: info.videoDetails.category,
                    publishDate: info.videoDetails.publishDate,
                    ownerSubscriptionName: info.videoDetails.ownerSubscriptionName,
                    uploadDate: info.videoDetails.uploadDate,
                    videoId: info.videoDetails.videoId,
                    keywords: info.videoDetails.keywords,
                    averageRating: info.videoDetails.averageRating,
                    likes: info.videoDetails.likes,
                    dislikes: info.videoDetails.dislikes
                },
                related: info.related_videos
            };

            console.log('got the info, now returning part of it');
            console.log(formattedResult);
            
            return formattedResult;
        });    
    } catch (e) {
        console.log(e);
    }
}

module.exports = getVideoInfo;
