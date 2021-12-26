import { NextApiHandler } from 'next';
const { models } = require('@/db');
const fs = require('fs');

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query
    try {
        return models.Collection.findByPk(id)
            // TODO: format for status & data props
            .then((collection: object) => {
                console.log('got the collection ' + id + ', now grabbing the linked subscriptions');
                try {
                    const subs = models.CollectionSubscription.findAll({ where: { collection: id } })
                        // .then((collection_subscriptions: object) => res.json({ collection, collection_subscriptions }))
                        console.log(subs);
                    res.json({ collection, subs });
                } catch (e) {
                    res.status(500).json({ message: e.message })
                }
                
                // res.json(collection);
            })
            .catch((err: Error) => {
                console.log('There was an error querying collection', JSON.stringify(err))
                return res.send(err)
            });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler