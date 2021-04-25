'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Channels', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null,
                unique: true
            },
            short_id: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null,
                unique: true
            },
            colors: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null
            },
            views: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: null
            },
            last_upload: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null
            },
            avatar: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null
            },
            yt_user_url: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null
            },
            channel_id: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null,
                unique: true
            },
            channel_url: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Channels');
    }
};
