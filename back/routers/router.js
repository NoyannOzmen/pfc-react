import { Router } from 'express';
import { animalRouter } from './animalRouter.js';
import { associationRouter } from './associationRouter.js';
import { sessionRouter } from './sessionRouter.js';
import { tagRouter } from './tagRouter.js';

export const router = Router();

router.use(animalRouter);
router.use(associationRouter);
router.use(sessionRouter);
router.use(tagRouter);
