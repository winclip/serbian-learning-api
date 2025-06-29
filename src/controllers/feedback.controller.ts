import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Feedback, { IFeedback } from "../models/Feedback";
import TelegramBot from "node-telegram-bot-api";

const botToken = process.env.TELEGRAM_BOT_TOKEN as string;
const chatId = process.env.TELEGRAM_CHAT_ID as string;
const bot = new TelegramBot(botToken);

export const createFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, comment }: IFeedback = req.body;

    if (!name || !email || !comment) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "All fields are required",
      });
      return;
    }

    const newFeedback = await Feedback.create({
      name,
      email,
      comment,
    });

    const telegramMessage = `
New Feedback!

Name: ${name}
Email: ${email}

Comment:${comment}

Time ${new Date().toLocaleString()}
    `;

    await bot.sendMessage(chatId, telegramMessage, { parse_mode: "Markdown" });

    res.status(StatusCodes.CREATED).json({
      message: "Thank you for your feedback!",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Feedback submission error:", error);

    if (error instanceof Error && error.message.includes("ETELEGRAM")) {
      console.error("Telegram API error:", error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to send notification, but feedback was saved",
      });
    } else {
      next(error);
    }
  }
};
