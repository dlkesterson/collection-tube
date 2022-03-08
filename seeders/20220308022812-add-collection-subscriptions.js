'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
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
            'CollectionSubscriptions',
            [
                {
                    subscription: 1,
                    collection: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                  subscription: 3,
                  collection: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
