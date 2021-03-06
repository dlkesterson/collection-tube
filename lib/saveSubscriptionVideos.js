const fs = require('fs');
const fetch = require('node-fetch');
const getColors = require('get-image-colors');
const sequelize = require('../db');
const downloadImages = require('./downloadImages');

async function saveSubscriptionVideos(videos, transaction, saveColors = true) {
    const newVideos = videos.map((pv) => {
        return {
            title: pv.title,
            video_id: pv.id,
            video_url: pv.shortUrl,
            subscription_id: pv.author.channelID || pv.author.id,
            thumbnail: pv.thumbnails[0].url,
            duration: pv.duration
        };
    });

    try {
        await downloadImages(newVideos)
            .then(async (imagePathList) => {
                console.log('downloaded all images for the new videos');
                if (saveColors) {
                    for (let i = 0; i < newVideos.length; i++) {
                        if (fs.existsSync(imagePathList[i])) {
                            const colorString = await getColors(
                                imagePathList[i]
                            ).then((colors) => {
                                return colors
                                    .map((color) => color.hex())
                                    .toString();
                            });
                            newVideos[i]['colors'] = colorString;
                        }
                    }
                }

                return newVideos;
            })
            .then(async (newVideos) => {
                await sequelize.models.Video.bulkCreate(newVideos, {
                    ignoreDuplicates: true,
                    transaction
                }).then(() => {
                    return { newVideos, transaction };
                });

                return { newVideos, transaction };
            });
    } catch (e) {
        console.error(e.message);
        return { message: e.message };
    }
}

module.exports = saveSubscriptionVideos;
