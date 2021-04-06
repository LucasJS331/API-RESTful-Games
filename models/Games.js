const sequelize = require('sequelize');
const connection = require('../db/connection');

const games = connection.define('games', {
    title: {
        type: sequelize.STRING,
        allowNull: false
    },

    year: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = games;