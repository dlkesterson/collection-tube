const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    class CollectionSubscription extends Model {}
    CollectionSubscription.init(
        {
            collection: { type: DataTypes.INTEGER, required: true },
            subscription: { type: DataTypes.INTEGER, required: true }
        },
        {
            sequelize,
            modelName: 'CollectionSubscription'
        }
    );
    return CollectionSubscription;
};
