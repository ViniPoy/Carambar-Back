const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Joke = sequelize.define('Joke', {
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'jokes',
    timestamps: true
})

module.exports = Joke