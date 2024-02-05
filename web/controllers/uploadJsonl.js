import { CreateStagedUploads } from "../services/CreateStagedUploads.js"

//qs

export const generateStagedUploadsCreate=async(req,res)=>{
   try {
    const payload= req.body
   const session = res.locals.shopify.session;
   const {stagedTargets,error}=await CreateStagedUploads(payload,session)
   if(error?.length > 0){
    res.status(500).json({message:"Something went wrong",sucsess:false})
  }else{
    res.status(200).json({stagedTargets,sucsess:true})
  }
   } catch (error) {
    res.status(500).json({message:"Something went wrong",sucsess:false})
   }

}