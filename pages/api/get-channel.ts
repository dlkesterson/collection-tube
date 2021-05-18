import { NextApiHandler } from 'next';
import { createImportSpecifier } from 'typescript';
const { models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.body
    try {
        return models.Channel.findByPk(id)
            .then((channels) => res.json(channels))
            .catch((err) => {
                console.log('There was an error querying channels', JSON.stringify(err))
                return res.send(err)
            });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export const getChannel = async (id) => {

    console.log('id is ' + id);

    const channel = await models.Channel.findByPk(id);
    const videos = await models.Video.findAll({
        where: {
            channel_id: channel.channel_id
        }
    });

    if (channel) {
        if (videos) {
            return {
                channel,
                videos
            }
        } else {
            return channel;
        }
    } else {
        return { error: '404 - Not found' };
    }
};

export const getAllChannels = async (id) => {

    console.log('id is ' + id);

    const channels = await models.Channel.findByPk(id);
    if (channels) {
        return channels;
    } else {
        return { error: '404 - Not found' };
    }
};

export default handler