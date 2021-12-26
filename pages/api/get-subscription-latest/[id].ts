import { NextApiHandler } from 'next';
const saveSubscription = require('@/lib/saveSubscription');
const handler: NextApiHandler = async (req, res) => {
    const { subscription_url } = req.query;
    const result = await saveSubscription(subscription_url);

    if (result && result.subscription) {
        res.status(200).send(result);
    } else {
        res.status(500).send(result);
    }
};

export default handler;
