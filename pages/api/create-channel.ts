import { NextApiHandler } from 'next'
import { cpuUsage } from 'node:process';
import ytpl from 'ytpl'
// import { promises as fs } from 'fs';
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

        const channel = await sequelize.models.Channel.create({
            name,
            views: playlist.views,
            avatar: bestAvatar.url,
            channel_id: channelID,
            channel_url: url
        }, { transaction });

        await downloadImage(channel['avatar'], channel['channel_id'], `${channel['channel_id']}`);

        if (videos.length > 0) {
            await saveChannelVideos(videos, transaction);
            // videos.forEach((video, index) => {
            //     console.log(index + ' / ' + videos.length + ' : video url : ' + video.shortUrl);
            // });
        }

        await transaction.commit();

        res.status(200).send(channel);
    } catch (e) {
        if (transaction) await transaction.rollback();

        res.status(500).json({ message: e.message });
    }
};

// params: image url, file location, file name
async function downloadImage(url, location, file_name) {
    const response = await fetch(url);
    const buffer = await response.buffer();
    const dir = `./data/${location}`;
    const image = `${dir}/${file_name}.jpg`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFile(image, buffer, () => { return image; });
    return image;
}

async function saveImageColors(imagePath) {
    // const dir = `./data/${video.channel_id}`;
    // const image = `${dir}/${video.video_id}.jpg`;
    const colors = await getColors(imagePath).then(colors => {
        return colors.map(color => color.hex()).toString();
    });

    // await sequelize.models.Video.update({ colors }, { where: { video_id: video.video_id }, transaction } );

    return colors;
}

// async function saveChannelVideosImageColors(videos, transaction) {
//     await videos.forEach((video) => {
//         const dir = `./data/${video.author.channelID}`;
//         const image = `${dir}/${video.id}.jpg`;
//         const colors = getColors(image);
//         console.log('typeof colors: ' + typeof colors);
//         console.log(colors);

//         sequelize.models.Video.update({ colors }, { where: { video_id: video.id }, transaction } )
//     });

// return;

// await sequelize.models.Video.bulkUpdate('roles', {
//     label: 'admin',
//   }, {
//     userType: 3,
//   },
// );
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
        // let colorString;

        // const imagePath = `./data/${pv.author.channelID}/${pv.id}.jpg`;

        // downloadImage(pv.thumbnails[0].url, pv.author.channelID, `${pv.id}`)
        // .then(() => {
        //     // colorString = saveImageColors(imagePath);
        //     colorString = getColors(imagePath).then(colors => {
        //         return colors.map(color => color.hex()).toString();
        //     })
        // });

        await downloadImages(newVideos)
            .then(async (imagePathList) => {
                console.log('\n\nat this point I would collect the colors from each downloaded image, and do a .map() to update newVideos "colors" prop to be filled in, before they are saved to DB\n\n');

                console.log('looping over ' + newVideos.length + ' items');
                for (let i = 0; i < newVideos.length; i++) {
                    console.log('looking for file ' + imagePathList[i]);
                    if (fs.existsSync(imagePathList[i])) {
                        console.log('verified that the file exists');
                        const colorString = await getColors(imagePathList[i]).then(colors => {
                            return colors.map(color => color.hex()).toString();
                        });
                        newVideos[i]['colors'] = colorString;
                        console.log('saving color: ' + newVideos[i]['colors']);
                    }
                }

                console.log('finished (i think?) saving colors of images, now ready to save videos to DB');
                return newVideos;
            })
            .then(async (newVideos) => {
                if (newVideos[0]['colors']) {
                    console.log('\n\nFOUND A COLOR!!!' + newVideos[0]['colors'] + '\n\n');
                }
                await sequelize.models.Video.bulkCreate(newVideos, { transaction })
                    .then(() => {
                        console.log('\n\n successfully saved the videos');

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
