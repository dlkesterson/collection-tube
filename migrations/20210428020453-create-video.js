'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Videos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            video_id: {
                type: Sequelize.STRING
            },
            video_url: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            channel_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Channels',
                    key: 'id'
                }
            },
            thumbnail: {
                type: Sequelize.STRING
            },
            duration: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Videos');
    }
};
