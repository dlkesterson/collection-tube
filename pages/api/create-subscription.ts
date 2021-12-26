import { NextApiHandler } from 'next'
import ytpl from 'ytpl'
const fs = require('fs');
const getColors = require('get-image-colors');
const sequelize = require('@/db');
import saveSubscriptionVideos from '@/lib/saveSubscriptionVideos';
import downloadImage from '@/lib/downloadImage';

const handler: NextApiHandler = async (req, res) => {
    const playlist = await ytpl(req.body.subscription_url);
    const { name, bestAvatar, url, channelID } = playlist.author;
    const videos = playlist.items;
    let transaction;

    console.log('create subscription via TS serverless API endpoint');

    try {
        transaction = await sequelize.transaction();
        const newSubscription = {
            name,
            views: playlist.views,
            avatar: bestAvatar.url,
            subscription_id: channelID,
            subscription_url: url,
            last_updated: playlist.lastUpdated
        };

        console.log('made new subscription object');
        
        await downloadImage(newSubscription['avatar'], newSubscription['subscription_id'], `${newSubscription['subscription_id']}`)
            .then(async (imagePath) => {
                console.log('downloaded image: ' + imagePath);
                    if (fs.existsSync(imagePath)) {
                        console.log('about to save colors');
                        newSubscription['colors'] = await getColors(imagePath).then(colors => {
                            console.log('generated colors');
                            const result = colors.map(color => color.hex()).toString();
                            console.log(result);
                            return result;
                        });
                    }

                return newSubscription;
            })
            .then(async (newSubscription) => {
                console.log('now saving new subscription to DB');
                console.log(newSubscription);
                await sequelize.models.Subscription.create(newSubscription, { transaction });
                
                if (videos.length > 0) {
                    console.log('now saving videos');
                    await saveSubscriptionVideos(videos, transaction);
                } else { console.log('no videos to save'); }
        
                await transaction.commit();
        
                res.status(200).send(newSubscription);
            })
            .catch(e => {
                console.log('Error! Something failed after downloading the image for the new subscription');
                console.log(e);
                console.log(e.message);
            });

    } catch (e) {
        if (transaction) await transaction.rollback();

        res.status(500).json({ message: e.message });
    }
};

export default handler
