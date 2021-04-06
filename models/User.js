const Sequelize = require("sequelize");
const connection = require("../db/connection");


const User = connection.define("user",{
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


User.sync({force: false});

module.exports = User;