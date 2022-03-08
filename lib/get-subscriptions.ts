
const { models } = require('@/db');

export const getAllSubscriptions = async (id: string) => {
    const subscriptions = await models.Subscription.findByPk(id);
    if (subscriptions) {
        // TODO: format for status & data props
        return subscriptions;
    } else {
        // TODO: format for status & data props
        return { error: '404 - Not found' };
    }
};