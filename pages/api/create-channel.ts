import { NextApiHandler } from 'next'
import ytpl from 'ytpl'
const fs = require('fs');
const fetch = require('node-fetch');
const { sequelize, models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    const playlist = await ytpl(req.body.channel_url);
    const { name, bestAvatar, url, channelID } = playlist.author;
    const videos = playlist.items;

    try {
        const channel = await models.Channel.create({
            name,
            views: playlist.views,
            avatar: bestAvatar.url,
            channel_id: channelID,
            channel_url: url
        });

        await downloadAvatar(channel);

        await saveChannelVideos(videos)
            .then(() => {
                res.status(200).send(channel.toJSON());
            });
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

async function saveChannelVideos(videos) {
    const newVideos = videos.map((pv) => {
        return {
            title: pv.title,
            video_id: pv.id,
            video_url: pv.shortUrl,
            channel_id: pv.author.channelID,
            thumbnail: pv.thumbnails[0].url,
            duration: pv.duration
        };
    });

    console.log('\n trying to save videos...');

    try {
        await models.Video.bulkCreate(newVideos)
            .then(() => {
                console.log('\n\n successfully saved the videos');
                return newVideos;
            });
    } catch (e) {
        console.log(e);
        console.log(`\nerror is.... : ${e.message}\n\n\n\n`);
        return { message: e.message };
    }
}

export default handler
