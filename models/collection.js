const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    class Collection extends Model {}
    Collection.init(
        {
            name: { type: DataTypes.STRING, required: true }
        },
        {
            sequelize,
            modelName: 'Collection'
        }
    );
    return Collection;
};
