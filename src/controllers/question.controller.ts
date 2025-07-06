import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Question from "../models/Question";
import { IQuestion } from "../types/models";
import { shuffleArray } from "../utils/shuffleArray";

export const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { topic } = req.query;

    let filter = {};
    if (typeof topic === "string") {
      const topicArray = topic.split(",");
      filter = { topic: { $in: topicArray } };
    }

    const questions = await Question.find(filter).populate("topic");

    const shuffledQuestions = shuffleArray(questions);

    res.status(StatusCodes.OK).json(shuffledQuestions);
  } catch (error) {
    next(error);
  }
};

export const createQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { topic, questionText, options, answerIndex } = req.body as IQuestion;

    if (
      !topic ||
      !questionText ||
      !options?.length ||
      answerIndex === undefined
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "All fields are required and options must be a non-empty array",
      });
      return;
    }

    if (answerIndex < 0 || answerIndex >= options.length) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "answerIndex is out of options array bounds",
      });
      return;
    }

    const newQuestion = await Question.create({
      topic,
      questionText,
      options,
      answerIndex,
    });

    res.status(StatusCodes.CREATED).json(newQuestion);
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { topic, questionText, options, answerIndex } =
      req.body as Partial<IQuestion>;

    if (
      answerIndex !== undefined &&
      options &&
      (answerIndex < 0 || answerIndex >= options.length)
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "answerIndex is out of options array bounds",
      });
      return;
    }

    const updated = await Question.findByIdAndUpdate(
      id,
      { topic, questionText, options, answerIndex },
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Question not found" });
      return;
    }

    res.status(StatusCodes.OK).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Question.findByIdAndDelete(id);

    if (!deleted) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Question not found" });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Question deleted successfully",
      deletedQuestion: deleted,
    });
  } catch (error) {
    next(error);
  }
};

export const getRandomQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { topic, limit = "10" } = req.query;

    if (!topic) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Topic is required" });
      return;
    }

    const parsedLimit = parseInt(limit as string, 10);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Limit must be a positive number" });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(topic as string)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid topic ID format" });
      return;
    }

    const questions = await Question.aggregate([
      { $match: { topic: new mongoose.Types.ObjectId(topic as string) } },
      { $sample: { size: parsedLimit } },
    ]);

    res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    next(error);
  }
};
