import { NextApiHandler } from 'next';
const { models } = require('@/db');
const sequelize = require('@/db');
import saveChannelVideos from '@/lib/saveChannelVideos';
import ytpl from 'ytpl';

// function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const channel = await models.Channel.findOne({
        where: {
            id
        },
        order: [['updatedAt', 'DESC']]
    });
    const channelVideos = await models.Video.findAll({
        where: {
            channel_id: channel.channel_id
        }
    });

    if (channel) {
        const playlist = await ytpl(channel.channel_url);
        // const { name, bestAvatar, url, channelID } = playlist.author;
        const videos = playlist.items;
        let transaction;

        console.log('count of videos for channel is... ' + channelVideos.length);

        if (channelVideos.length > 0 && channelVideos[0]['video_id'] !== videos[0]['id']) {
            try {
                transaction = await sequelize.transaction();
                await saveChannelVideos(videos, transaction);
                await transaction.commit();
                
                return res.json({
                    channel,
                    videos
                });
            } catch (e) {
                if (transaction) await transaction.rollback();

                return res.status(500).json({ error: '404 - Not found' });
            }
        } else if ( channelVideos.length === 0 ) {
            try {
                transaction = await sequelize.transaction();
                await saveChannelVideos(videos, transaction);
                await transaction.commit();
                
                return res.json({
                    channel,
                    videos
                });
            } catch (e) {
                if (transaction) await transaction.rollback();

                return res.status(500).json({ error: '404 - Not found' });
            }
        } else {
            console.log('no new videos found, we already have latest');
            res.json({
                channel,
                videos: channelVideos
            })
        }
        
    } else {
        res.json({ channel: null, videos: null, error: '404 - Not found' });
    }
}

export default handler;