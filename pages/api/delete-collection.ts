import { NextApiHandler } from 'next';
const { models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    try {
        // @TODO: destroy collection-ID-bound records in CollectionSubscriptions table
        return models.Collection.destroy({
            where: {
                id: req.query.id
            }
        })
        .then((response: any) => res.json(response))
        .catch((err: object) => {
            return res.send(err)
        });
    } catch (e: any) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
