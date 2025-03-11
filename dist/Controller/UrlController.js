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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUrls = exports.getShortUrlStats = exports.deleteShortUrl = exports.updateShortUrL = exports.reduceToOrginalUrl = exports.createShortUrl = void 0;
const Url_1 = __importDefault(require("../Model/Url"));
const shortCodeGenerator_1 = __importDefault(require("../Utils/shortCodeGenerator"));
const createShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { originalUrl } = req.body;
    const shortCode = (0, shortCodeGenerator_1.default)();
    try {
        // Create the URL record
        const url = yield Url_1.default.create({ original_url: originalUrl, short_code: shortCode });
        res.status(201).json({ shortCode: url.short_code });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create short URL' });
    }
});
exports.createShortUrl = createShortUrl;
const reduceToOrginalUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortCode } = req.params;
    try {
        const url = yield Url_1.default.findOne({ where: { short_code: shortCode } });
        if (url) {
            yield url.increment('access_count');
            res.redirect(url.original_url);
        }
        else {
            res.status(404).json({ error: "URL not found" });
        }
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to redirect', message: error });
    }
});
exports.reduceToOrginalUrl = reduceToOrginalUrl;
const updateShortUrL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortCode } = req.params;
    const { newOriginalUrl } = req.body;
    try {
        const [updated] = yield Url_1.default.update({ orignal_url: newOriginalUrl }, { where: { short_code: shortCode } });
        if (updated) {
            res.status(200).json({ message: 'URL updated successfully', data: { updated } });
        }
        else {
            res.status(404).json({ error: 'Url not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update URL" });
    }
});
exports.updateShortUrL = updateShortUrL;
const deleteShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortCode } = req.params;
    try {
        const deleted = yield Url_1.default.destroy({ where: { short_code: shortCode } });
        if (deleted) {
            res.status(200).json({ message: "URL deleted successfully", data: { deleted } });
        }
        else {
            res.status(404).json({ error: "URL not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete URL' });
    }
});
exports.deleteShortUrl = deleteShortUrl;
const getShortUrlStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortCode } = req.params;
    try {
        const url = yield Url_1.default.findOne({ where: { short_code: shortCode } });
        if (url) {
            res.status(200).json({ accessCount: url.access_count });
        }
        else {
            res.status(404).json({ error: 'Url not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve Stats ' });
    }
});
exports.getShortUrlStats = getShortUrlStats;
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield Url_1.default.findAll({});
        console.log('Retrieved URLs:', url);
        if (!url || url.length === 0) {
            return {
                code: 404,
                success: false,
                message: "User not available",
                data: null
            };
        }
        return {
            code: 200,
            success: true,
            message: 'User available',
            data: { url }
        };
    }
    catch (error) {
        return {
            code: 500,
            success: false,
            message: 'An error occured while getting users',
            error: error
        };
    }
});
const allUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield Url_1.default.findAll({});
        res.json(all);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.allUrls = allUrls;
