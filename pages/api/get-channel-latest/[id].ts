import { NextApiHandler } from 'next';
const saveChannel = require('@/lib/saveChannel');
const handler: NextApiHandler = async (req, res) => {
    const { channel_url } = req.query;
    const result = await saveChannel(channel_url);

    if (result && result.channel) {
        res.status(200).send(result);
    } else {
        res.status(500).send(result);
    }
};

export default handler;
