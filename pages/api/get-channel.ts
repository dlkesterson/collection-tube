import { NextApiHandler } from 'next'
import { createNoSubstitutionTemplateLiteral } from 'typescript'
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
      SELECT id, name, description, channel_url
      FROM channels
      WHERE id = ?
    `,
            id
        )

        return res.json(results[0])
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export const getChannel = async (id) => {
    console.log('getChannel()');
    const results = await query(
        `
      SELECT id, name, description, channel_url
      FROM channels
      WHERE id = ?
    `,
        id
    )

    return results[0]

    // const response = await fetch('/api/get-channel?id=2');
    // return await response.json();
};

export default handler
