import { NextApiHandler } from 'next'
import ytpl from 'ytpl'
import shortid from 'shortid'
import { query } from '@/lib/db'

const saveChannelToDb = async (req, res) => {
    return new Promise(function () {
        if (!req.body.url) {
            return res
                .status(400)
                .json({ message: 'channel url` is required' })
        }
        ytpl(req.body.url, function (err, playlist) {
            if (err) throw err;
            // const { name, avatar, channel_url, user_url, user } = playlist.author;

            // update channel data
            // const channel_shortid = shortid.generate();

            console.log(playlist.author);

            // try {
            //     const results = await query(
            //         `
            //   UPDATE channels
            //   SET name = ?, avatar = ?, channel_url = ?, yt_user_url = ?, yt_user = ?, shortid = ?
            //   WHERE id = ?
            //   `,
            //         [name, avatar, channel_url, yt_user_url, yt_user, channel_shortid]
            //     );

            //     return res.json(results[0]);
            // } catch (e) {
            //     res.status(500).json({ message: e.message });
            // }


        });
    });
};

const handler: NextApiHandler = async (req, res) => {
    const playlist = await ytpl(req.body.url);
    const { name, bestAvatar, url } = playlist.author;
    const channel_shortid = shortid.generate();

    try {
        const results = await query(
            `
      UPDATE channels
      SET name = ?, avatar = ?, channel_url = ?, yt_user_url = ?, shortid = ?, total_visits = ?, total_items = ?
      WHERE id = ?
      `,
            [name, bestAvatar.url, req.body.url, url, channel_shortid, playlist.views, playlist.items.length, req.body.id]
        );

        return res.json(results[0]);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

    // return res.json(playlist);
};



// saveChannelToDb(req, res).then((result) => {
//     const { id } = result;
//     console.log('result:');
//     console.log(result);
//     res.redirect('/channel/' + id);
// });

export default handler
