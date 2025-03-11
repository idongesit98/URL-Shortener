import { Request,Response } from "express";
import Url from "../Model/Url";
import generateShortCode from "../Utils/shortCodeGenerator";

export const createShortUrl = async (req: Request, res: Response)=>{
    const { originalUrl } = req.body 
    const shortCode = generateShortCode();

    try {
        // Create the URL record
        const url = await Url.create({ original_url: originalUrl, short_code: shortCode });
        res.status(201).json({ shortCode: url.short_code });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create short URL' });
    }
};

export const reduceToOrginalUrl = async (req:Request,res:Response) => {
    const {shortCode} = req.params

    try {
        const url = await Url.findOne({where: {short_code:shortCode} })
        if (url) {
            await url.increment('access_count');
            res.redirect(url.original_url);
        }else{
            res.status(404).json({error:"URL not found"})
        }
    } catch (error) {
        console.error('Error:',error)
        res.status(500).json({error:'Failed to redirect', message:error})
    }
}

export const updateShortUrL = async (req:Request,res:Response) => {
    const {shortCode} = req.params;
    const {newOriginalUrl} = req.body;

    try {
        const [updated] = await Url.update(
            {orignal_url:newOriginalUrl},
            {where: {short_code:shortCode}}
        );

        if (updated) {
            res.status(200).json({message:'URL updated successfully',data:{updated}})
        }else{
            res.status(404).json({error:'Url not found'})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to update URL"});
    }
}

export const deleteShortUrl = async(req:Request,res:Response) =>{
    const {shortCode} = req.params

    try {
        const deleted = await Url.destroy({where: {short_code:shortCode}})
        if (deleted) {
            res.status(200).json({message:"URL deleted successfully",data:{deleted}})
        }else{
            res.status(404).json({error:"URL not found"})
        }
    } catch (error) {
        res.status(500).json({error:'Failed to delete URL'})
    }
}

export const getShortUrlStats = async(req:Request,res:Response) => {
    const {shortCode} = req.params;
    try {
        const url = await Url.findOne({where:{short_code:shortCode}});
        if(url){
            res.status(200).json({accessCount:url.access_count});
        }else{
            res.status(404).json({error:'Url not found'});
        }
    } catch (error) {
        res.status(500).json({error:'Failed to retrieve Stats '})
    }
}

const getAllUrl = async(req:Request, res:Response) =>{
    try {
        const url = await Url.findAll({})
        
        console.log('Retrieved URLs:', url);

        if (!url || url.length === 0) {
            return{
                code:404,
                success:false,
                message:"User not available",
                data:null
            }
        }
        return{
            code:200,
            success:true,
            message:'User available',
            data:{url}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:'An error occured while getting users',
            error:error
        }
     }
}

export const allUrls = async(req:Request,res:Response) =>{
    try {
         const all = await Url.findAll({})
    res.json(all)
    } catch (error) {
        res.status(500).json({message:error})
    }
}