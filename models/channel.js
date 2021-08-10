const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    class Channel extends Model {}
    Channel.init(
        {
            name: DataTypes.STRING,
            colors: DataTypes.STRING,
            views: DataTypes.INTEGER,
            last_upload: DataTypes.STRING,
            last_updated: DataTypes.STRING,
            avatar: DataTypes.STRING,
            auto_download: DataTypes.INTEGER,
            yt_user_url: { type: DataTypes.STRING, isUrl: true },
            channel_id: DataTypes.STRING,
            channel_url: { type: DataTypes.STRING, isUrl: true, required: true }
        },
        {
            sequelize,
            modelName: 'Channel'
        }
    );
    return Channel;
};
