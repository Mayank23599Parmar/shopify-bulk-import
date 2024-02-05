import csvtojson from "csvtojson"
import fs from "fs"
import { converCSVToShopifyObj } from "../utils.js";
export const uploadExcelToJsonl=async(req,res)=>{
   
    
try {
    const { path } = req.file;
    // Convert CSV to JSONL format
    const jsonArray = await csvtojson()
    .fromFile(path);
    const jsonlData = jsonArray.map((obj) => {
        const data=converCSVToShopifyObj(obj)
        return JSON.stringify(data)
    }).join('\n');
    // Write JSONL data to file
    const jsonlFilePath = `${path.replace(".csv",".jsonl")}`;
    const csvFilePath = `${path}`;
    fs.writeFileSync(jsonlFilePath, jsonlData);
          // Stream the file to the response
       if(fs.existsSync(jsonlFilePath)){
        const fileStream = fs.createReadStream(jsonlFilePath);
        const fileName = 'shopify.jsonl';
        res.setHeader('Content-type', 'application/jsonl');
        res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
        fileStream.pipe(res);
        //Delete the temporary file after sending it
        fileStream.on("end", () => {
    //    fs.unlinkSync(jsonlFilePath);
    //    fs.unlinkSync(csvFilePath);
       });
       fileStream.on('error', (err) => {
        console.error('Error reading file:', err);
        res.status(500).send('Internal server error');
      });
       }else{
        res.status(404).send('File not found');
       }
} catch (error) {

    console.log(error)
}
}