import { NextApiHandler } from 'next';
const saveSubscription = require('@/lib/saveSubscription');
const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const result = await saveSubscription(id);

    if (result && result.subscription) {
        res.status(200).send(result);
    } else {
        res.status(500).send(result);
    }
};

export default handler;
