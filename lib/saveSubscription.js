const fs = require('fs');
const getColors = require('get-image-colors');
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

				await downloadImage(
					newSubscription['avatar'], 
					newSubscription['subscription_id'], 
					`${newSubscription['subscription_id']}`
				)
				.then(async (imagePath) => {
					if (fs.existsSync(imagePath)) {
						newSubscription['colors'] = await getColors(imagePath).then(colors => {
							const result = colors.map(color => color.hex()).toString();
							return result;
						});
					}

					return newSubscription;
				})
				.then(async (newSubscription) => {
					if (videos.length > 0) {
						await saveSubscriptionVideos(videos, transaction);
					}

					await sequelize.models.Subscription.update(newSubscription, {
						transaction, where: {
							id
						}
					});
					await transaction.commit();
				});
			} catch (e) {
				console.error(e.message);
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
				console.error(e.message);
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
				console.error(e.message);
				if (transaction) await transaction.rollback();

				return { error: '404 - Not found' };
			}
		} else {
			// no new videos found, we already have latest
			return {
				subscription,
				videos: subscriptionVideos
			}
		}
	} else {
		// didnt find any subscription with that ID
		return { subscription: null, videos: null, error: '404 - Not found' };
	}
}

module.exports = saveSubscription;
