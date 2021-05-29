import { NextApiHandler } from 'next'
import ytpl from 'ytpl'
const fs = require('fs');
const getColors = require('get-image-colors');
const fetch = require('node-fetch');
const sequelize = require('@/db');

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
                }
        
                await transaction.commit();
        
                res.status(200).send(newChannel);
            });

    } catch (e) {
        if (transaction) await transaction.rollback();

        res.status(500).json({ message: e.message });
    }
};

// params: image url, file location, file name
async function downloadImage(url, location, file_name) {
    const response = await fetch(url);
    const buffer = await response.buffer();
    const dir = `./public/data/${location}`;
    const image = `${dir}/${file_name}.jpg`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFile(image, buffer, () => { return image; });
    return image;
}

// async function saveImageColors(imagePath) {
//     const colors = await getColors(imagePath).then(colors => {
//         return colors.map(color => color.hex()).toString();
//     });

//     return colors;
// }

async function downloadImages(videos) {
    let imagePathList = [];
    for (const video of videos) {
        const imagePath = await downloadImage(video.thumbnail, video.channel_id, `${video.video_id}`)
        imagePathList.push(imagePath);
    }

    return imagePathList;
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

    try {
        await downloadImages(newVideos)
            .then(async (imagePathList) => {
                for (let i = 0; i < newVideos.length; i++) {
                    if (fs.existsSync(imagePathList[i])) {
                        const colorString = await getColors(imagePathList[i]).then(colors => {
                            return colors.map(color => color.hex()).toString();
                        });
                        newVideos[i]['colors'] = colorString;
                    }
                }

                return newVideos;
            })
            .then(async (newVideos) => {
                await sequelize.models.Video.bulkCreate(newVideos, { transaction })
                    .then(() => {
                        return newVideos;
                    });
            });
    } catch (e) {
        console.log(e);
        console.log(`\nerror is.... : ${e.message}\n\n\n\n`);
        return { message: e.message };
    }
}

export default handler
