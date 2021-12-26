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
            downloaded: {
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            colors: {
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
            subscription_id: {
                type: Sequelize.STRING
                // references: {
                //     model: 'Subscriptions',
                //     key: 'id'
                // }
            },
            thumbnail: {
                type: Sequelize.STRING
            },
            duration: {
                type: Sequelize.STRING
            },
            published: {
                type: Sequelize.STRING
            },
            short_view_count_text: {
                type: Sequelize.STRING
            },
            view_count: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            downloadedAt: {
                type: Sequelize.STRING
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Videos');
    }
};
