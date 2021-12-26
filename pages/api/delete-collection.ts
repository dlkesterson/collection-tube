import { NextApiHandler } from 'next';
const { models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    console.log('\ndeleting collection: ' + req.query.id);
    try {
        // @TODO: destroy collection-ID-bound records in CollectionSubscriptions table
        return models.Collection.destroy({
            where: {
                id: req.query.id
            }
        })
        .then((response) => res.json(response))
        .catch((err) => {
            console.log('There was an error deleting collection', JSON.stringify(err))
            return res.send(err)
        });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
