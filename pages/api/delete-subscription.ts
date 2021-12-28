import { NextApiHandler } from 'next';
const { models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    console.log('\ndeleting subscription: ' + req.query.id);
    try {
        return models.Subscription.destroy({
            where: {
                id: req.query.id
            }
        })
        .then((response: any) => res.json(response))
        .catch((err: object) => {
            console.log('There was an error deleting subscription', JSON.stringify(err))
            return res.send(err)
        });
    } catch (e: any) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
