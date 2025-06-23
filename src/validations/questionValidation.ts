import Joi from "joi";

export const createQuestionSchema = Joi.object({
  topic: Joi.string().required(),
  questionText: Joi.string().required(),
  options: Joi.array().items(Joi.string()).min(1).required(),
  answerIndex: Joi.number().integer().min(0).required(),
});

export const updateQuestionSchema = Joi.object({
  topic: Joi.string().optional(),
  questionText: Joi.string().optional(),
  options: Joi.array().items(Joi.string()).min(1).optional(),
  answerIndex: Joi.number().integer().min(0).optional(),
});
