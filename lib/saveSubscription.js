const fs = require('fs');
const getColors = require('get-image-colors');
const wsServer = require('./websockets');
const { models } = require('../db');
const sequelize = require('../db');
const saveSubscriptionVideos = require('./saveSubscriptionVideos');
const downloadImage = require('./downloadImage');
const ytpl = require('ytpl');

async function saveSubscription(id) {
	let transaction;
	const subscription = await models.Subscription.findOne({
		where: {
			id
		}
	});

    console.log('create subscription via saveSubscription()');

	if (subscription) {
		const playlist = await ytpl(subscription.subscription_url);
		const subscriptionVideos = await models.Video.findAll({
			where: {
				subscription_id: subscription.subscription_id
			}
		});
		const { name, bestAvatar, url, channelID } = playlist.author;
		const videos = playlist.items;

		// if no name is in DB and playlist data is available, save it to DB
		if (!subscription['name'] && playlist) {
			try {
				transaction = await sequelize.transaction();
				const newSubscription = {
					name,
					views: playlist.views,
					avatar: bestAvatar.url,
					subscription_id: channelID,
					subscription_url: url,
					last_updated: playlist.lastUpdated
				};
				wsServer.on('connection', socket => {
					console.log('websocket connection from saveSubscription!');

					console.log('made new subscription object');
					socket.send('made new subscription object');
				});

				await downloadImage(
					newSubscription['avatar'], 
					newSubscription['subscription_id'], 
					`${newSubscription['subscription_id']}`
				)
				.then(async (imagePath) => {
					console.log('downloaded image: ' + imagePath);
					if (fs.existsSync(imagePath)) {
						console.log('about to save colors');
						newSubscription['colors'] = await getColors(imagePath).then(colors => {
							console.log('generated colors');
							const result = colors.map(color => color.hex()).toString();
							console.log(result);
							return result;
						});
					}

					return newSubscription;
				})
				.then(async (newSubscription) => {
					console.log('now saving new subscription to DB');
					console.log(newSubscription);
					await sequelize.models.Subscription.update(newSubscription, {
						transaction, where: {
							id
						}
					});

					if (videos.length > 0) {
						console.log('now saving videos');
						await saveSubscriptionVideos(videos, transaction);
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

		if (subscriptionVideos.length > 0 && subscriptionVideos[0]['video_id'] !== videos[0]['id']) {
			try {
				transaction = await sequelize.transaction();
				await saveSubscriptionVideos(videos, transaction);
				await transaction.commit();

				return {
					subscription,
					videos
				};
			} catch (e) {
				if (transaction) await transaction.rollback();

				return { error: '404 - Not found' };
			}
		} else if (subscriptionVideos.length === 0) {
			try {
				transaction = await sequelize.transaction();
				await saveSubscriptionVideos(videos, transaction);
				await transaction.commit();

				return {
					subscription,
					videos
				};
			} catch (e) {
				if (transaction) await transaction.rollback();

				return { error: '404 - Not found' };
			}
		} else {
			console.log('no new videos found, we already have latest');
			return {
				subscription,
				videos: subscriptionVideos
			}
		}
	} else {
		console.log('didnt find any subscription with that ID');
		return { subscription: null, videos: null, error: '404 - Not found' };
	}
}

module.exports = saveSubscription;
