import { NextApiHandler } from 'next';
const { models } = require('@/db');
// import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.body
    try {
        if (!id) {
            return res.status(400).json({ message: '`id` required' })
        }
        if (typeof parseInt(id.toString()) !== 'number') {
            return res.status(400).json({ message: '`id` must be a number' })
        }
        //     const results = await query(
        //         `
        //   SELECT shortid, name, channel_url
        //   FROM channels
        //   WHERE shortid = ?
        // `,
        //         id
        //     )

        //     return res.json(results[0])
        return res.json({ status: 200, message: 'success!' })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export const getChannel = async (id) => {
    const results = { status: 200, message: 'success!' }

    return results;


    return models.Channel.find({ id })
        .then((channel) => res.json(channel))
        .catch((err) => {
            console.log('There was an error querying channel' + id, JSON.stringify(err))
            return res.send(err)
        });
};

export default handler