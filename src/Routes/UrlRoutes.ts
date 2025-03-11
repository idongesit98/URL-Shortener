import express from "express";
import {createShortUrl, reduceToOrginalUrl,updateShortUrL,deleteShortUrl,getShortUrlStats, allUrls } from "../Controller/UrlController";
const router = express.Router()

router.get('/:shortCode',reduceToOrginalUrl)
router.get('/all', allUrls) //cant understand why it is not working
router.post('/shorten', createShortUrl)
router.put('/:shortCode',updateShortUrL)
router.get('/:shortCode/stats', getShortUrlStats);
router.delete('/:shortCode',deleteShortUrl)

export default router