import { NextApiHandler } from 'next';
const { models } = require('@/db');
const fs = require('fs');
const downloadImage = require('@/lib/downloadImage');

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.body
    try {
        return models.Subscription.findByPk(id)
            // TODO: format for status & data props
            .then((subscriptions: []) => res.json(subscriptions))
            .catch((err: Error) => {
                return res.send(err)
            });
    } catch (e: any) {
        res.status(500).json({ message: e.message })
    }
}
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
            console.log('detected no thumbnail! now downloading thumbnail');
            await downloadImage(subscription.avatar, `${subscription.subscription_id}`, `${subscription.subscription_id}`);
            console.log('finished downloading thumbnail');
        } else {
            console.log('code thinks thumbnail image already exists');
        }
        // TODO: format for status & data props
        return {
            subscription,
            videos: subscriptionVideos
        }
    }
};

export const getAllSubscriptions = async (id: string) => {
    const subscriptions = await models.Subscription.findByPk(id);
    if (subscriptions) {
        // TODO: format for status & data props
        return subscriptions;
    } else {
        // TODO: format for status & data props
        return { error: '404 - Not found' };
    }
};

export default handler