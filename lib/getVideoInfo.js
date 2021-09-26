const ytdl = require('ytdl-core');
const sequelize = require('@/db');

async function getVideoInfo(video_url) {
	await ytdl(video_url).on('info', (info) => {
		// console.log(info.related_videos);
		console.log('title: ' + info.videoDetails.title);
		console.log('description: ' + info.videoDetails.description);
		console.log('author: ');
		console.log(info.videoDetails.author.name);
		console.log('viewCount: ' + info.videoDetails.viewCount);
		console.log('averageRating: ' + info.videoDetails.averageRating);
		console.log(info.videoDetails.storyboards[0].templateUrl);
		console.log(info.videoDetails.storyboards.at(-1).templateUrl);

		console.log('returning the info...');

        return {
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
		};
    });
}

module.exports = getVideoInfo;
