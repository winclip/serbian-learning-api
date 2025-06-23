import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { StatusCodes } from "http-status-codes";

export const validateRequest =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
      return;
    }
    next();
  };
