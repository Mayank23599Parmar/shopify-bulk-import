import express from 'express'
import { generateStagedUploadsCreate } from '../controllers/uploadJsonl.js';
import { importController } from '../controllers/importController.js';

import { uploadExcelToJsonl } from '../controllers/uploadExcelToJsonl.js';
import {upload} from '../utils.js'
export const importCustomer=express.Router();

importCustomer.post("/upload-jsonl",generateStagedUploadsCreate)
importCustomer.post("/upload-excel",upload.single('file'),uploadExcelToJsonl)
importCustomer.post("/import",importController)