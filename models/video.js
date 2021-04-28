'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    class Video extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Video.belongsTo(models.Channel, {
                foreignKey: 'channel_id'
            });
        }
    }
    Video.init(
        {
            title: DataTypes.STRING,
            video_id: DataTypes.STRING,
            video_url: DataTypes.STRING,
            channel_id: DataTypes.STRING,
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
