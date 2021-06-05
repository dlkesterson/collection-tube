const fs = require('fs');
const fetch = require('node-fetch');
const getColors = require('get-image-colors');
const sequelize = require('@/db');
import downloadImages from '@/lib/downloadImages';

export default async function saveChannelVideos(videos, transaction, saveColors = true) {
    console.log('beginning of saveChannelVideos');
    const newVideos = videos.map((pv) => {
        return {
            title: pv.title,
            video_id: pv.id,
            video_url: pv.shortUrl || `https://www.youtube.com/watch?v=${pv.id}`,
            channel_id: pv.author.channelID || pv.author.id,
            thumbnail: pv.thumbnails[0].url,
            duration: pv.duration
        };
    });

    try {
        console.log('inside try {}');
        await downloadImages(newVideos)
            .then(async (imagePathList) => {
                console.log('downloaded all images for the new videos');
                if ( saveColors ) {
                    for (let i = 0; i < newVideos.length; i++) {
                        if (fs.existsSync(imagePathList[i])) {
                            const colorString = await getColors(imagePathList[i]).then(colors => {
                                return colors.map(color => color.hex()).toString();
                            });
                            newVideos[i]['colors'] = colorString;
                        }
                    }
                }

                return newVideos;
            })
            .then(async (newVideos) => {
                console.log('now saving videos to DB');
                for (let i = 0; i < newVideos.length; i++) {
                    await sequelize.models.Video.upsert(newVideos[i], { transaction });
                }

                return { newVideos, transaction };

                // await sequelize.models.Video.bulkCreate(newVideos, { ignoreDuplicates: true, transaction })
                //     .then(() => {
                //         return { newVideos, transaction};
                //     });
            });
    } catch (e) {
        console.log(e);
        console.log(`\nerror is.... : ${e.message}\n\n\n\n`);
        return { message: e.message };
    }
}

module.exports = saveChannelVideos;