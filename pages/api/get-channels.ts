import { NextApiHandler } from 'next'
const { models } = require('@/db');

const handler: NextApiHandler = async (_, res) => {
    try {
        return models.Channel.findAll()
            .then((channels) => res.json(channels))
            .catch((err) => {
                console.log('There was an error querying channels', JSON.stringify(err))
                return res.send(err)
            });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
