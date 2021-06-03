import { NextApiHandler } from 'next';
import { createImportSpecifier } from 'typescript';
const { models } = require('@/db');
const sequelize = require('@/db');
import saveChannelVideos from '@/lib/saveChannelVideos';
import ytpl from 'ytpl';

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

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

export const getChannel = async (id) => {
    let channel;
    let channelVideos;
    if (isNumber(id)) {
        channel = await models.Channel.findByPk(id);
        channelVideos = await models.Video.findAll({
            where: {
                channel_id: channel.channel_id
            }
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
            }
        });
    }

    if (channel) {
        const playlist = await ytpl(channel.channel_url);
        const { name, bestAvatar, url, channelID } = playlist.author;
        const videos = playlist.items;
        let transaction;

        console.log('count of videos for channel is... ' + channelVideos.length);

        if (channelVideos.length > 0 && channelVideos[0]['video_id'] !== videos[0]['id']) {

            try {
                transaction = await sequelize.transaction();
                await saveChannelVideos(videos, transaction);
                await transaction.commit();
                
                return {
                    channel,
                    videos
                }

            } catch (e) {
                if (transaction) await transaction.rollback();

                return { error: '404 - Not found' };
            }
        } else {
            console.log('no new videos found, we already have latest');
            return {
                channel,
                videos: channelVideos
            }
        }
        
    } else {
        return { channel: null, videos: null, error: '404 - Not found' };
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