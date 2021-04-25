import { NextApiHandler } from 'next'
const db = require('@/models/index');

const handler: NextApiHandler = async (_, res) => {
    try {
        return db.Channel.findAll()
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
