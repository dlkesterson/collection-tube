import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { name, description, channel_url } = req.body
    try {
        if (!channel_url) {
            return res
                .status(400)
                .json({ message: '`channel url`is required' })
        }

        const results = await query(
            `
      INSERT INTO channels (name, description, channel_url)
      VALUES (?, ?, ?)
      `,
            [name, description, channel_url]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
