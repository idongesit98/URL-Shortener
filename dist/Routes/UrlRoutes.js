"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UrlController_1 = require("../Controller/UrlController");
const router = express_1.default.Router();
router.get('/:shortCode', UrlController_1.reduceToOrginalUrl);
router.get('/all', UrlController_1.allUrls); //cant understand why it is not working
router.post('/shorten', UrlController_1.createShortUrl);
router.put('/:shortCode', UrlController_1.updateShortUrL);
router.get('/:shortCode/stats', UrlController_1.getShortUrlStats);
router.delete('/:shortCode', UrlController_1.deleteShortUrl);
exports.default = router;
