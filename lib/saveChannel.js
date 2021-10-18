const fs = require('fs');
const getColors = require('get-image-colors');
const wsServer = require('./websockets');
const { models } = require('../db');
const sequelize = require('../db');
const saveChannelVideos = require('./saveChannelVideos');
const downloadImage = require('./downloadImage');
const ytpl = require('ytpl');

async function saveChannel(id) {
	let transaction;
	const channel = await models.Channel.findOne({
		where: {
			id
		}
	});

	if (channel) {
		const playlist = await ytpl(channel.channel_url);
		const channelVideos = await models.Video.findAll({
			where: {
				channel_id: channel.channel_id
			}
		});
		const { name, bestAvatar, url, channelID } = playlist.author;
		const videos = playlist.items;

		// if no name is in DB and playlist data is available, save it to DB
		if (!channel['name'] && playlist) {
			try {
				transaction = await sequelize.transaction();
				const newChannel = {
					name,
					views: playlist.views,
					avatar: bestAvatar.url,
					channel_id: channelID,
					channel_url: url,
					last_updated: playlist.lastUpdated
				};
				wsServer.on('connection', socket => {
					console.log('websocket connection from saveChannel!');

					console.log('made new channel object');
					socket.send('made new channel object');
				});

				await downloadImage(
					newChannel['avatar'], 
					newChannel['channel_id'], 
					`${newChannel['channel_id']}`
				)
				.then(async (imagePath) => {
					console.log('downloaded image: ' + imagePath);
					if (fs.existsSync(imagePath)) {
						console.log('about to save colors');
						newChannel['colors'] = await getColors(imagePath).then(colors => {
							console.log('generated colors');
							const result = colors.map(color => color.hex()).toString();
							console.log(result);
							return result;
						});
					}

					return newChannel;
				})
				.then(async (newChannel) => {
					console.log('now saving new channel to DB');
					console.log(newChannel);
					await sequelize.models.Channel.update(newChannel, {
						transaction, where: {
							id
						}
					});

					if (videos.length > 0) {
						console.log('now saving videos');
						await saveChannelVideos(videos, transaction);
					} else { console.log('no videos to save'); }

					await transaction.commit();
				})
				.catch(e => {
					console.log(e);
					console.log(e.message);
				});
			} catch (e) {
				if (transaction) await transaction.rollback();
			}
		}

		if (channelVideos.length > 0 && channelVideos[0]['video_id'] !== videos[0]['id']) {
			try {
				transaction = await sequelize.transaction();
				await saveChannelVideos(videos, transaction);
				await transaction.commit();

				return {
					channel,
					videos
				};
			} catch (e) {
				if (transaction) await transaction.rollback();

				return { error: '404 - Not found' };
			}
		} else if (channelVideos.length === 0) {
			try {
				transaction = await sequelize.transaction();
				await saveChannelVideos(videos, transaction);
				await transaction.commit();

				return {
					channel,
					videos
				};
			} catch (e) {
				if (transaction) await transaction.rollback();

				return { error: '404 - Not found' };
			}
		} else {
			console.log('no new videos found, we already have latest');
			return {
				channel,
				videos: channelVideos
			}
		}
	} else {
		console.log('didnt find any channel with that ID');
		return { channel: null, videos: null, error: '404 - Not found' };
	}
}

module.exports = saveChannel;
