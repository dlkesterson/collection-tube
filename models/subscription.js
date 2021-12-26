const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    class Subscription extends Model {}
    Subscription.init(
        {
            name: DataTypes.STRING,
            colors: DataTypes.STRING,
            views: DataTypes.INTEGER,
            last_upload: DataTypes.STRING,
            last_updated: DataTypes.STRING,
            avatar: DataTypes.STRING,
            auto_download: DataTypes.INTEGER,
            yt_user_url: { type: DataTypes.STRING, isUrl: true },
            subscription_id: DataTypes.STRING,
            subscription_url: { type: DataTypes.STRING, isUrl: true, required: true }
        },
        {
            sequelize,
            modelName: 'Subscription'
        }
    );
    return Subscription;
};
