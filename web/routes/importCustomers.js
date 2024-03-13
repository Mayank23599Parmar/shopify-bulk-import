import express from 'express'
import { generateStagedUploadsCreate } from '../controllers/uploadJsonl.js';
import { importController } from '../controllers/importController.js';
import fs from "fs"
import { dirname } from 'path'
import { fileURLToPath } from 'url';
import { uploadExcelToJsonl } from '../controllers/uploadExcelToJsonl.js';
import { upload } from '../utils.js'
export const importCustomer = express.Router();

importCustomer.post("/upload-jsonl", generateStagedUploadsCreate)
importCustomer.post("/upload-excel", upload.single('file'), uploadExcelToJsonl)
importCustomer.post("/import", importController)
importCustomer.get("/download", (req, res) => {
  //const appDir = dirname(require.main.filename);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename).replace("routes", "uploads");
  const jsonlFileName = "customer.jsonl";
  const jsonlFilePath = __dirname + "/customer.jsonl";

  // Set the appropriate headers for text file download
  const fileStream = fs.readFileSync(jsonlFilePath);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", "attachment; filename=" + jsonlFileName);
  // Assuming you have a text file, read and stream it to the response
  res.send(fileStream)
  fs.unlinkSync(jsonlFilePath);
})