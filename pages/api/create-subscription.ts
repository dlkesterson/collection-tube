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
    let transaction: any;

    try {
        transaction = await sequelize.transaction();
        let newSubscription = {
            name,
            views: playlist.views,
            avatar: bestAvatar.url,
            subscription_id: channelID,
            subscription_url: url,
            last_updated: playlist.lastUpdated,
            colors: ''
        };
        
        // download the new subscription's avatar image 
        // use it to generate the color scheme
        await downloadImage(
            newSubscription['avatar'], 
            newSubscription['subscription_id'], 
            `${newSubscription['subscription_id']}`
            )
            .then(async (imagePath) => {
                if (fs.existsSync(imagePath)) {
                    newSubscription['colors'] = await getColors(imagePath).then((colors: [any]) => {
                        const result = colors.map((color: { hex(): []}) => color.hex()).toString();
                        return result;
                    });
                }

                return newSubscription;
            })
            // prepare new subscription for insertion into DB
            // save the first 100 videos of the subscription, along with their images & color schemes
            .then(async (newSubscription) => {
                if (videos.length > 0) {
                    await saveSubscriptionVideos(videos, transaction);
                }
        
                await sequelize.models.Subscription.create(newSubscription, { transaction });
                await transaction.commit();
        
                res.status(200).send(newSubscription);
            });

    } catch (e: any) {
        if (transaction) await transaction.rollback();

        res.status(500).json({ message: e.message });
    }
};

export default handler
