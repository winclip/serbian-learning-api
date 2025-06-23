import Joi from "joi";

export const createWordSchema = Joi.object({
  topic: Joi.string().required(),
  wordSr: Joi.string().required(),
  wordEn: Joi.string().required(),
});

export const updateWordSchema = Joi.object({
  topic: Joi.string().optional(),
  wordSr: Joi.string().optional(),
  wordEn: Joi.string().optional(),
});
