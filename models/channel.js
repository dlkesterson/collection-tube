const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    class Channel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Channel.hasMany(models.Video, {
                foreignKey: 'channel_id',
                allowNull: false
            });
        }
    }
    Channel.init(
        {
            name: DataTypes.STRING,
            short_id: DataTypes.STRING,
            colors: DataTypes.STRING,
            views: DataTypes.INTEGER,
            last_upload: DataTypes.STRING,
            avatar: DataTypes.STRING,
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
