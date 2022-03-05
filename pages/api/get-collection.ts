import { NextApiHandler } from 'next';
const { models } = require('@/db');

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query
    try {
        // const result = await getCollection(id);
        // console.log('result:');
        // console.log(result);
        return models.Collection.findByPk(id)
            // TODO: format for status & data props
            .then((collection: object) => {
                console.log('got the collection ' + id + ', now grabbing the linked subscriptions');
                try {
                    const subs = models.CollectionSubscription.findAll({ where: { collection: id } })
                        console.log(subs);
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

export const getCollection = async (id: string|string[]) => {
    return models.Collection.findByPk(id)
        // TODO: format for status & data props
        .then((collection: object) => {
            console.log('got the collection ' + id + ', now grabbing the linked subscriptions');
            try {
                models.CollectionSubscription.findAll({ where: { collection: id } })
                    .then((subs: []) => {
                        // console.log('subs:');console.log(subs);
                        let subscriptions = subs.map((sub: { dataValues: object}) => {
                            return sub.dataValues;
                        });
                        console.log('subscriptions:');console.log(subscriptions);
                        return { collection, subscriptions };
                    })
                    // console.log(subs);
                // return { collection, subs };
            } catch (e: any) {
                return { message: e.message };
            }
        })
        .catch((err: Error) => {
            console.log('There was an error querying collection', JSON.stringify(err))
            return err;
        });
}