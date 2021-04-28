import { NextApiHandler } from 'next'
import ytpl from 'ytpl'
import shortid from 'shortid'
const fs = require('fs');
const fetch = require('node-fetch');
const { models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    const playlist = await ytpl(req.body.channel_url);
    const { name, bestAvatar, url, channelID } = playlist.author;
    const short_id = shortid.generate();

    try {
        const newChannel = {
            name,
            short_id,
            views: playlist.views,
            avatar: bestAvatar.url,
            channel_id: channelID,
            channel_url: url
        };
        const channel = await models.Channel.create(newChannel);

        await downloadAvatar(channel);

        res.status(200).send(channel.toJSON());
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

async function downloadAvatar(channel) {
    const response = await fetch(channel['avatar']);
    const buffer = await response.buffer();
    const dir = `./data/${channel.channel_id}`;
    const image = `${dir}/${channel.channel_id}.jpg`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFile(image, buffer, () => { return; });
}

export default handler
