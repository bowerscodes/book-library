const { Sequelize } = require('sequelize');
const sequelize = require ('sequelize');

// destructure environment variables from process.env 
const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

function setUpDatabase () {
    const connection = new Sequelize(DB_NAME,DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'mysql',
        logging: false,
    });

    connection.sync({alter: true});
    return {};
};


module.exports = setupDatabase();