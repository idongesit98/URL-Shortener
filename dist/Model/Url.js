"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sqlConnect_1 = __importDefault(require("../Utils/Config/sqlConnect"));
class Url extends sequelize_1.Model {
}
Url.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    original_url: {
        type: sequelize_1.DataTypes.STRING(2048),
        allowNull: false
    },
    short_code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    access_count: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    sequelize: sqlConnect_1.default,
    tableName: 'urls',
    timestamps: true,
    createdAt: 'created_at'
});
exports.default = Url;
