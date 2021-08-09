import { NextApiHandler } from 'next';
const { models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    console.log('\ndeleting channel: ' + req.query.id);
    try {
        return models.Channel.destroy({
            where: {
                id: req.query.id
            }
        })
            .then((response) => res.json(response))
            .catch((err) => {
                console.log('There was an error deleting channel', JSON.stringify(err))
                return res.send(err)
            });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
