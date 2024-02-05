import { importToShopify } from "../services/importToShopify.js";

export const importController=async(req,res)=>{
    const payload= req.body
    const session = res.locals.shopify.session;
    const data=await importToShopify(payload,session)
    if(data?.success){
        res.status(200).json(data)
    }else{
        res.status(500).json(data)  
    }

}