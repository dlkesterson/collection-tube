import { NextApiHandler } from 'next';
const { models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.body
    try {
        return models.Video.findByPk(id)
            .then((video) => res.json(video))
            .catch((err) => {
                console.log('There was an error querying video', JSON.stringify(err))
                return res.send(err)
            });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export const getVideo = async (id) => {

    console.log('id is ' + id);

    const video = await models.Video.findByPk(id);
    if (video) {
        return video;
    } else {
        return { error: '404 - Not found' };
    }
};

export const getAllChannelVideos = async (channel_id) => {

    console.log('videos channel_id is ' + channel_id);

    const videos = await models.Video.findByPk(channel_id);
    if (videos) {
        return videos;
    } else {
        return { error: '404 - Not found' };
    }
};

export default handler