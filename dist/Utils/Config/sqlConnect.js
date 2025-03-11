"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false
});
sequelize.authenticate()
    .then(() => {
    console.log("Database connected successfully");
})
    .catch(err => {
    console.error('Error connected to the database:', err);
});
exports.default = sequelize;
