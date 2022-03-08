
const { models } = require('@/db');

export const getAllSubscriptionVideos = async (subscription_id: string) => {
    const videos = await models.Video.findByPk(subscription_id);
    if (videos) {
        // TODO: format for status & data props
        return videos;
    } else {
        // TODO: format for status & data props
        return { error: '404 - Not found' };
    }
};