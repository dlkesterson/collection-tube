'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            'Subscriptions',
            [
                {
                    subscription_url: 'https://www.youtube.com/user/wesbos',
                    auto_download: 0,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    subscription_url: 'https://www.youtube.com/user/shiffman',
                    auto_download: 0,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    subscription_url: 'https://www.youtube.com/user/LevelUpTuts',
                    auto_download: 0,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    subscription_url:
                        'https://www.youtube.com/subscription/UCsBjURrPoezykLs9EqgamOA',
                        auto_download: 0,
                        createdAt: new Date(),
                        updatedAt: new Date()
                },
                {
                    subscription_url:
                        'https://www.youtube.com/subscription/UCqrxiLP9RHz2GxDJaZuTRBw',
                        auto_download: 0,
                        createdAt: new Date(),
                        updatedAt: new Date()
                },
                {
                    subscription_url: 'https://www.youtube.com/subscription/UCLNgu_OupwoeESgtab33CCw',
                    auto_download: 0,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    subscription_url: 'https://www.youtube.com/c/TailwindLabs',
                    auto_download: 0,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
