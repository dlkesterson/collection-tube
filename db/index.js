const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite3",
    raw: true, // avoids having to append everything with ".dataValues"
});

const modelDefiners = [
    require('../models/subscription'),
    require('../models/video'),
    require('../models/collection'),
    require('../models/collection-subscription')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;