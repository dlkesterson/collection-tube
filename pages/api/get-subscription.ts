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