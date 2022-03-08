import { NextApiHandler } from 'next';
const { models } = require('@/db');

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

export default handler