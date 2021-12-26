'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CollectionSubscriptions', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        collection: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: null
        },
        subscription: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: null
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CollectionSubscriptions');
  }
};
