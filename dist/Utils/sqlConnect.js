"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
console.log('Database Credentials:', {
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_HOST: process.env.DATABASE_HOST,
});
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
const syncDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        sequelize.sync().then(() => {
            console.log("Database sync successfully");
        });
    }
    catch (error) {
        console.error("Error syncing database:", error);
    }
});
exports.default = syncDatabase;
