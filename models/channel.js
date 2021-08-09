// const { Sequelize, DataTypes } = require('sequelize');
// const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config.json')[env];
// const sequelize = new Sequelize(config);

// module.exports = sequelize.define('Channel', {
//     name: DataTypes.STRING,
//     colors: DataTypes.STRING,
//     views: DataTypes.INTEGER,
//     last_upload: DataTypes.STRING,
//     last_updated: DataTypes.STRING,
//     avatar: DataTypes.STRING,
//     auto_download: DataTypes.INTEGER,
//     yt_user_url: { type: DataTypes.STRING, isUrl: true },
//     channel_id: DataTypes.STRING,
//     channel_url: { type: DataTypes.STRING, isUrl: true, required: true }
// }, {
//     sequelize,
//     modelName: 'Channel'
// });






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
