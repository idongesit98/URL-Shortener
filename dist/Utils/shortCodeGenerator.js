"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortCode = void 0;
const generateShortCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';
    for (let i = 0; i < 6; i++) {
        shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortCode;
};
exports.generateShortCode = generateShortCode;
exports.default = exports.generateShortCode;
