import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.body
    try {
        if (!id) {
            return res.status(400).json({ message: '`id` required' })
        }
        if (typeof parseInt(id.toString()) !== 'number') {
            return res.status(400).json({ message: '`id` must be a number' })
        }
        const results = await query(
            `
      SELECT shortid, name, channel_url
      FROM channels
      WHERE shortid = ?
    `,
            id
        )

        return res.json(results[0])
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export const getChannel = async (id) => {
    const results = await query(
        `
      SELECT *
      FROM channels
      WHERE shortid = ?
    `,
        id
    )

    return results[0]
};

export default handler
