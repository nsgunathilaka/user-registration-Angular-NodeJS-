const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0, //hide errors
    logging: false, //outputing SQL to the console
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

sequelize.authenticate()
    .then(() => {
        console.log('Connected to DB')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./userModel.js')(sequelize, DataTypes)

db.sequelize
    .sync({ force: false, alter: true })
    .then(() => {
        console.log("sequelize sync done");
    });

module.exports = db;