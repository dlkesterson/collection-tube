import { NextApiHandler } from 'next'
import { query } from '@/lib/db'
import downloadImage from '@/lib/downloadImage';

const handler: NextApiHandler = async (req, res) => {
    const { url, id } = req.body
    try {
        if (!url) {
            return res
                .status(400)
                .json({ message: 'url` is required' })
        }
        console.log(`channel #${id} ... avatar url: ${url}`);

        const results = await downloadImage({ id, url });

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
