import Joi from "joi";

export const createTopicSchema = Joi.object({
  nameSr: Joi.string().required(),
  nameEn: Joi.string().required(),
});

export const updateTopicSchema = Joi.object({
  nameSr: Joi.string().optional(),
  nameEn: Joi.string().optional(),
});
