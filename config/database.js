const { Sequelize } = require('sequelize');

// Initialisation de Sequelize avec SQLite (stockage local dans le fichier database.sqlite)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

module.exports = sequelize;