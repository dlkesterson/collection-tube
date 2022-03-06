import { NextApiHandler } from 'next';
const db = require('@/db');

interface Collection { id: string; subs: [], dataValues: []; }
interface CollectionSubscription { 
    dataValues: { id: number; collection: number; subscription: number; }
}

const handler: NextApiHandler = async (_, res) => {
    const collectionsWithSubs = await db.query(
    `SELECT 
        c.id AS collectionID, 
        c.name AS collectionName, 
        s.name AS subscriptionName,
        s.colors, 
        s.views 
    FROM Subscriptions AS s
    INNER JOIN CollectionSubscriptions AS cs
        ON s.id = cs.subscription 
    INNER JOIN Collections AS c 
        ON cs.collection = c.id`);

    try {
        res.json(await db.models.Collection.findAll() );
    } catch (e: any) {
        res.status(500).json({ message: e.message })
    }
}

export default handler