import { NextApiHandler } from 'next'
import ytpl from 'ytpl'
import shortid from 'shortid'
const { models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    const playlist = await ytpl(req.body.channel_url);
    const { name, bestAvatar, url, channelID } = playlist.author;
    const short_id = shortid.generate();
    let channel_id = channelID;

    console.log('in the handler');
    console.log('a name: ' + name);
    console.log('a short_id: ' + short_id);
    console.log('a channel_id: ' + channel_id);
    console.log('a url: ' + url);
    console.log('a channelID: ' + channelID);

    try {
        let newChannel = {
            name,
            short_id,
            views: playlist.views,
            avatar: bestAvatar.url,
            channel_id: channelID,
            channel_url: url
        };
        console.log('trying');
        console.log(newChannel);
        const channel = await models.Channel.create(newChannel);
        // .then((channel) => {
        // console.log('success');
        res.status(200).send(channel.toJSON());
        // })
        // .catch((err) => {
        //     console.log('***There was an error creating a channel', JSON.stringify({ name, url }))
        //     return res.status(400).send(err)
        // });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler
