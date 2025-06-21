import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Topic from "../models/Topic";
import { ITopic } from "../types/models";

export const getTopics = async (req: Request, res: Response): Promise<void> => {
  try {
    const topics = await Topic.find();
    res.status(StatusCodes.OK).json(topics);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch topics",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const createTopic = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nameSr, nameEn }: ITopic = req.body;

    if (!nameSr || !nameEn) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Both nameSr and nameEn are required",
      });
      return;
    }

    const newTopic = await Topic.create({ nameSr, nameEn });
    res.status(StatusCodes.CREATED).json(newTopic);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create topic",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const updateTopic = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { nameSr, nameEn }: Partial<ITopic> = req.body;

    const updated = await Topic.findByIdAndUpdate(
      id,
      { nameSr, nameEn },
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Topic not found" });
      return;
    }

    res.status(StatusCodes.OK).json(updated);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update topic",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteTopic = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Topic.findByIdAndDelete(id);

    if (!deleted) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Topic not found" });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Topic deleted successfully",
      deletedTopic: deleted,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to delete topic",
      error: error instanceof Error ? error.message : error,
    });
  }
};
