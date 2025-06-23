import { Request, Response, NextFunction } from "express";
import Word from "../models/Word";
import { StatusCodes } from "http-status-codes";
import { IWord } from "../types/models";

export const getWords = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { topic } = req.query;
    const filter = topic ? { topic } : {};
    const words = await Word.find(filter).populate("topic");
    res.status(StatusCodes.OK).json(words);
  } catch (error) {
    next(error);
  }
};

export const createWord = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { topic, wordSr, wordEn }: IWord = req.body;

    if (!topic || !wordSr || !wordEn) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields are required" });
      return;
    }

    const newWord = await Word.create({ topic, wordSr, wordEn });
    res.status(StatusCodes.CREATED).json(newWord);
  } catch (error) {
    next(error);
  }
};

export const updateWord = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { topic, wordSr, wordEn }: Partial<IWord> = req.body;

    const updated = await Word.findByIdAndUpdate(
      id,
      { topic, wordSr, wordEn },
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Word not found" });
      return;
    }

    res.status(StatusCodes.OK).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteWord = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Word.findByIdAndDelete(id);

    if (!deleted) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Word not found" });
      return;
    }

    res.status(StatusCodes.OK).json({ message: "Word deleted successfully" });
  } catch (error) {
    next(error);
  }
};
