import { NextApiHandler } from 'next';
const { models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query
    try {
        return models.Collection.findByPk(id)
            // TODO: format for status & data props
            .then((collection: object) => {
                try {
                    const subs = models.CollectionSubscription.findAll({ where: { collection: id } })
                    res.json({ collection, subs });
                } catch (e: any) {
                    res.status(500).json({ message: e.message })
                }
            })
            .catch((err: Error) => {
                console.log('There was an error querying collection', JSON.stringify(err))
                return res.send(err)
            });
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
}

export default handler;

export const getCollection = async (id: string) => {
    return models.Collection.findByPk(id)
        // TODO: format for status & data props
        .then((collection: object) => {
            try {
                let subscriptions;
                models.CollectionSubscription.findAll({ where: { collection: id } })
                    .then((subs: []) => {
                        subscriptions = subs.map((sub: { dataValues: object}) => {
                            return sub.dataValues;
                        });
                    })
                return { collection, subscriptions };
            } catch (e: any) {
                return { message: e.message };
            }
        })
        .catch((err: Error) => {
            console.log('There was an error querying collection', JSON.stringify(err))
            return err;
        });
}