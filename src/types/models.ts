import { Types } from "mongoose";

export interface ITopic {
  nameSr: string;
  nameEn: string;
}

export interface IWord {
  topic: string | Types.ObjectId;
  wordSr: string;
  wordEn: string;
}

export interface IQuestion {
  topic: string | Types.ObjectId;
  questionText: string;
  options: string[];
  answerIndex: number;
}
