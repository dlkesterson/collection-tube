import { NextApiHandler } from 'next';
const { models } = require('@/db');

const handler: NextApiHandler = async (_, res) => {
    try {
        return models.Video.findAll({
            order: [['createdAt', 'DESC']]
        })
            .then((videos: []) => res.json(videos))
            .catch((err: Error) => {
                console.log(
                    'There was an error querying videos',
                    JSON.stringify(err)
                );
                return res.send(err);
            });
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};

export default handler;

export const getVideos = async () => {
    let videos = await models.Video.findAll();

    videos = videos.map((video: { dataValues: object}) => {
        return video.dataValues;
    });

    if (videos) {
        console.log('found videos, count: ' + videos.length);
        console.log('first vid from backend:');
        console.log(videos[0]);
        return videos;
    } else {
        return { error: '404 - Not found' };
    }
};

export const getAllVideoPaths = async () => {
    const videos = await models.Video.findAll();
    const videoIDs = videos.filter((v: { id: string }) => {
        v.id;
    });
    let paths = [];
    for (let video of videoIDs) {
        paths.push({ params: { id: String(video.id) } });
    }
    return paths;
};
