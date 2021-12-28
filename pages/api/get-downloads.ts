import { NextApiHandler } from 'next';
const getDownloads = require('@/lib/getDownloads');

const handler: NextApiHandler = async (_, res) => {
    try {
        const data = await getDownloads();
        res.status(200).send(data);
    } catch (e: any) {
        res.status(500).json({ message: e.message })
    }
}

export default handler;