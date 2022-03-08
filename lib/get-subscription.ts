const { models } = require('@/db');
const fs = require('fs');
const downloadImage = require('@/lib/downloadImage');

export const getSubscription = async (id: string | number) => {
    let subscriptionVideos;  
    let subscription = await models.Subscription.findOne({
        where: {
            subscription_id: id
        }
    });
    if (subscription) {
        subscriptionVideos = await models.Video.findAll({
            where: {
                subscription_id: subscription.subscription_id
            },
            order: [['updatedAt', 'DESC']]
        });
    }

    if (subscription) {
        const thumbnailPath = `/public/data/${subscription.subscription_id}/${subscription.subscription_id}.jpg`;

        // check if thumbnail image is downloaded
        if (!fs.existsSync(thumbnailPath)) {
            await downloadImage(subscription.avatar, `${subscription.subscription_id}`, `${subscription.subscription_id}`);
        }
        // TODO: format for status & data props
        return {
            subscription,
            videos: subscriptionVideos
        }
    }
};