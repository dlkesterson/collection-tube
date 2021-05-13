'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    class Video extends Model {}
    Video.init(
        {
            title: DataTypes.STRING,
            video_id: DataTypes.STRING,
            video_url: { type: DataTypes.STRING, isUrl: true, required: true },
            channel_id: DataTypes.STRING,
            published: DataTypes.STRING,
            short_view_count_text: DataTypes.STRING,
            view_count: DataTypes.STRING,
            description: DataTypes.STRING,
            thumbnail: DataTypes.STRING,
            duration: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Video'
        }
    );
    return Video;
};
