import { NextApiHandler } from 'next'
import ytpl from 'ytpl'
const fs = require('fs');
const fetch = require('node-fetch');
const sequelize = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    const playlist = await ytpl(req.body.channel_url);
    const { name, bestAvatar, url, channelID } = playlist.author;
    const videos = playlist.items;
    let transaction;

    try {
        transaction = await sequelize.transaction();

        const channel = await sequelize.models.Channel.create({
            name,
            views: playlist.views,
            avatar: bestAvatar.url,
            channel_id: channelID,
            channel_url: url
        }, { transaction });

        // await downloadAvatar(channel);
        await downloadImage(channel['avatar'], channel['channel_id'], `${channel['channel_id']}`);

        await saveChannelVideos(videos, transaction);

        await transaction.commit();

        res.status(200).send(channel);
    } catch (e) {
        if (transaction) await transaction.rollback();

        res.status(500).json({ message: e.message });
    }
};

// params: image url, file location, file name
async function downloadImage(url, location, file_name) {
// async function downloadAvatar(channel) {
    const response = await fetch(url);
    const buffer = await response.buffer();
    const dir = `./data/${location}`;
    const image = `${dir}/${file_name}.jpg`;
    // const response = await fetch(channel['avatar']);
    // const buffer = await response.buffer();
    // const dir = `./data/${channel.channel_id}`;
    // const image = `${dir}/${channel.channel_id}.jpg`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFile(image, buffer, () => { return; });
}

async function saveChannelVideos(videos, transaction) {
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
        await sequelize.models.Video.bulkCreate(newVideos, { transaction })
            .then(() => {
                console.log('\n\n successfully saved the videos');

                newVideos.forEach(async (video) => { 
                    await downloadImage(video.thumbnail, video.channel_id, `${video.video_id}`);
                });

                return newVideos;
            });
    } catch (e) {
        console.log(e);
        console.log(`\nerror is.... : ${e.message}\n\n\n\n`);
        return { message: e.message };
    }
}

export default handler
