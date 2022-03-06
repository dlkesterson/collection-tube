import { NextApiHandler } from 'next';
const { models } = require('@/db');

const handler: NextApiHandler = async (_, res) => {
    try {
        return models.Subscription.findAll({
            order: [['updatedAt', 'DESC']]
        })
        .then((subscriptions: []) => res.json(subscriptions))
        .catch((err: Error) => {
            console.log('There was an error querying subscriptions', JSON.stringify(err))
            return res.send(err)
        });
    } catch (e: any) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
