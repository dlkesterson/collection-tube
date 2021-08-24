const downloadImage = require('./downloadImage');

async function downloadImages(videos) {
    let imagePathList = [];
    for (const video of videos) {
        const imagePath = await downloadImage(video.thumbnail, video.channel_id, `${video.video_id}`)
        imagePathList.push(imagePath);
    }

    return imagePathList;
}
module.exports = downloadImages;