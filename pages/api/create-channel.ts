import { NextApiHandler } from 'next'
import ytpl from 'ytpl'
import shortid from 'shortid'
import { query } from '@/lib/db'
import downloadImage from '@/lib/downloadImage';

const handler: NextApiHandler = async (req, res) => {
    const playlist = await ytpl(req.body.channel_url);
    const { name, bestAvatar, url, channelID } = playlist.author;
    const channel_shortid = shortid.generate();

    try {
        const results = await query(
            `
      INSERT INTO channels (name, avatar, description, channel_url, yt_user_url, yt_channel_id, shortid, total_visits, total_items)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
            [name, bestAvatar.url, playlist.description, req.body.channel_url, url, channelID, channel_shortid, playlist.views, playlist.items.length]
        );

        console.log('saved channel, now using id and channel avatar url to downloadImage()');

        console.log(results);

        downloadImage({ id: results.insertId, url: bestAvatar.url }).then(() => {
            console.log('finished, now redirecting');
            return res.status(200).redirect('/channels');
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler
