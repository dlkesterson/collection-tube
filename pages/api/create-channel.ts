import { NextApiHandler } from 'next'
import ytpl from 'ytpl'
const fs = require('fs');
const getColors = require('get-image-colors');
const sequelize = require('@/db');
import saveChannelVideos from '@/lib/saveChannelVideos';
import downloadImage from '@/lib/downloadImage';

const handler: NextApiHandler = async (req, res) => {
    const playlist = await ytpl(req.body.channel_url);
    const { name, bestAvatar, url, channelID } = playlist.author;
    const videos = playlist.items;
    let transaction;

    try {
        transaction = await sequelize.transaction();
        const newChannel = {
            name,
            views: playlist.views,
            avatar: bestAvatar.url,
            channel_id: channelID,
            channel_url: url
        };

        console.log('made new channel object');
        
        await downloadImage(newChannel['avatar'], newChannel['channel_id'], `${newChannel['channel_id']}`)
            .then(async (imagePath) => {
                console.log('downloaded image: ' + imagePath);
                    if (fs.existsSync(imagePath)) {
                        console.log('about to save colors');
                        newChannel['colors'] = await getColors(imagePath).then(colors => {
                            console.log('generated colors');
                            const result = colors.map(color => color.hex()).toString();
                            console.log(result);
                            return result;
                        });
                    }

                return newChannel;
            })
            .then(async (newChannel) => {
                console.log('now saving new channel to DB');
                console.log(newChannel);
                await sequelize.models.Channel.create(newChannel, { transaction });
                
                if (videos.length > 0) {
                    console.log('now saving videos');
                    await saveChannelVideos(videos, transaction);
                } else { console.log('no videos to save'); }
        
                await transaction.commit();
        
                res.status(200).send(newChannel);
            });

    } catch (e) {
        if (transaction) await transaction.rollback();

        res.status(500).json({ message: e.message });
    }
};

export default handler
