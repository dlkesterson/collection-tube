'use strict';
const { remove } = require('fs-extra');

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
                defaultValue: null
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
            last_updated: {
                type: Sequelize.STRING
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
            auto_download: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
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
        await queryInterface.dropTable('Channels');

        remove('./public/data/') 
            .then(() => console.log("Directory and files inside it are deleted")) 
            .catch((e) => console.log(e));
    }
};
