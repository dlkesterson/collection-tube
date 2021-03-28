import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { id, name, description, channel_url } = req.body
    try {
        if (!channel_url) {
            return res
                .status(400)
                .json({ message: 'channel url` is required' })
        }

        const results = await query(
            `
      UPDATE channels
      SET name = ?, description = ?, channel_url = ?
      WHERE id = ?
      `,
            [name, description, channel_url, id]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
