import Joi from 'joi';
import { Tag } from '../models/Tag.js';

const tagController = {
  async createTag(req, res, next) {
    const createTagSchema = Joi.object({
      tag_name: Joi.string().min(1).required(),
      tag_description: Joi.string(),
    });

    const { error } = createTagSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { tag_name, tag_description } = req.body;

    await Tag.create({
      nom: tag_name,
      description: tag_description,
    });

    const tagList = await Tag.findAll();
    res.status(201).json(tagList);
  },
};

export { tagController };
