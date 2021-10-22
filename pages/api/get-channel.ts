import { NextApiHandler } from 'next';
const { models } = require('@/db');
const fs = require('fs');
const downloadImage = require('@/lib/downloadImage');

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.body
    try {
        return models.Channel.findByPk(id)
            // TODO: format for status & data props
            .then((channels) => res.json(channels))
            .catch((err) => {
                console.log('There was an error querying channels', JSON.stringify(err))
                return res.send(err)
            });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

export const getChannel = async (id) => {
    let channel;
    let channelVideos;
    if (isNumber(id)) {
        channel = await models.Channel.findByPk(id);
        channelVideos = await models.Video.findAll({
            where: {
                channel_id: channel.channel_id
            },
            order: [['updatedAt', 'DESC']]
        });
    } else {
        channel = await models.Channel.findOne({
            where: {
                channel_id: id
            }
        });
        channelVideos = await models.Video.findAll({
            where: {
                channel_id: channel.channel_id
            },
            order: [['updatedAt', 'DESC']]
        });
    }

    if (channel) {
        const thumbnailPath = `/public/data/${channel.channel_id}/${channel.channel_id}.jpg`;
        console.log('checking for channel image: ' + thumbnailPath);

        // check if thumbnail image is downloaded
        if (!fs.existsSync(thumbnailPath)) {
            console.log('detected no thumbnail! now downloading thumbnail');
            await downloadImage(channel.avatar, `${channel.channel_id}`, `${channel.channel_id}`);
            console.log('finished downloading thumbnail');
        } else {
            console.log('code thinks thumbnail image already exists');
        }
        // TODO: format for status & data props
        return {
            channel,
            videos: channelVideos
        }
    }
};

export const getAllChannels = async (id) => {
    const channels = await models.Channel.findByPk(id);
    if (channels) {
        // TODO: format for status & data props
        return channels;
    } else {
        // TODO: format for status & data props
        return { error: '404 - Not found' };
    }
};

export default handler