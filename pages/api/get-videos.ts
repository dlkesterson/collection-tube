import { NextApiHandler } from 'next';
const { models } = require('@/db');

const handler: NextApiHandler = async (_, res) => {
    try {
        return models.Video.findAll({
            order: [['createdAt', 'DESC']]
        })
            .then((videos) => res.json(videos))
            .catch((err) => {
                console.log('There was an error querying videos', JSON.stringify(err))
                return res.send(err)
            });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
