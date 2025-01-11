import { Router } from "express";
import { tagController } from "../controllers/tagController.js";
import multer from 'multer';
const upload = multer();


const tagRouter = Router();

tagRouter.post('/tags/create',upload.none(), tagController.createTag)

export { tagRouter };