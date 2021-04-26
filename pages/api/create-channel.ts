import { NextApiHandler } from 'next'
import ytpl from 'ytpl'
import shortid from 'shortid'
import db from '@/models/index';

const handler: NextApiHandler = async (req, res) => {
    const playlist = await ytpl(req.body.channel_url);
    const { name, bestAvatar, url, channelID } = playlist.author;
    const short_id = shortid.generate();

    console.log('in the handler');

    try {
        //         [name, bestAvatar.url, playlist.description, req.body.channel_url, url, channelID, channel_shortid, playlist.views, playlist.items.length]
        console.log('trying');
        console.log('using channelUrl ' + url);
        db.Channel.create({ name, channel_url: url, channel_id: channelID, short_id })
            .then((channel) => {
                console.log('success');
                res.status(200).json(channel);
            })
            .catch((err) => {
                console.log('***There was an error creating a channel', JSON.stringify({ name, url }))
                return res.status(400).send(err)
            });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler
