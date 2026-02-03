import { Router } from 'express';
import { tagController } from '../controllers/tagController.js';

const tagRouter = Router();

tagRouter.post('/tags/create', tagController.createTag);

export { tagRouter };
