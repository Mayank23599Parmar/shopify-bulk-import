import csvtojson from "csvtojson"
import fs from "fs"
import { converCSVToShopifyObj } from "../utils.js";
export const uploadExcelToJsonl = async (req, res) => {


    try {
        const { path } = req.file;
        // Convert CSV to JSONL format
        const jsonArray = await csvtojson()
            .fromFile(path);
        const jsonlData = jsonArray.map((obj) => {
            const data = converCSVToShopifyObj(obj)
            return JSON.stringify(data)
        }).join('\n');
        // Write JSONL data to file
        const jsonlFilePath = `${path.replace(".csv", ".jsonl")}`;
        const csvFilePath = `${path}`;
        fs.writeFileSync(jsonlFilePath, jsonlData);
        if (fs.existsSync(jsonlFilePath)) {
            fs.unlinkSync(csvFilePath);
            res.send(200).json({ upload: true })
        } else {
            res.status(404).send('File not found');
        }
    } catch (error) {

        console.log(error)
    }
}