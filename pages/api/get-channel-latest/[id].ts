import { NextApiHandler } from 'next';
// const { models } = require('@/db');
// const sequelize = require('@/db');
const saveChannel = require('@/lib/saveChannel');
// import saveChannelVideos from '@/lib/saveChannelVideos';
// import ytpl from 'ytpl';

// function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

const handler: NextApiHandler = async (req, res) => {
    const { channel_url } = req.query;

    const result = await saveChannel(channel_url);

    if (result && result.channel) {
        res.status(200).send(result);
    } else {
        res.status(500).send(result);
    }
}

export default handler;