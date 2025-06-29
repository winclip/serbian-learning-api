import Joi from "joi";

export const createFeedbackSchema = Joi.object({
  name: Joi.string().required().min(2).max(50).messages({
    "any.required": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 50 characters",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Must be a valid email address",
  }),
  comment: Joi.string().required().min(10).max(1000).messages({
    "any.required": "Comment is required",
    "string.min": "Comment must be at least 10 characters",
    "string.max": "Comment cannot exceed 1000 characters",
  }),
});
