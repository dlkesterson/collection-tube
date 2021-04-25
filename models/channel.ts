const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Channel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Channel.init({
        name: DataTypes.STRING,
        _id: DataTypes.STRING,

        total_visits: DataTypes.STRING,
        total_items: DataTypes.STRING,
        total_videos: DataTypes.STRING,

        description: DataTypes.STRING,
        channel: DataTypes.STRING,
        avatar: DataTypes.STRING,
        yt_user: DataTypes.STRING,
        last_upload: DataTypes.STRING,

        url: { type: DataTypes.STRING, isUrl: true, required: true },
        channel_url: { type: DataTypes.STRING, isUrl: true },
        yt_user_url: { type: DataTypes.STRING, isUrl: true },

        created_on: { type: DataTypes.STRING, isDate: true },
        updated_on: { type: DataTypes.STRING, isDate: true },
        last_updated: { type: DataTypes.STRING, isDate: true }
    }, {
        sequelize,
        modelName: 'Channel',
    });
    return Channel;
};
export { }