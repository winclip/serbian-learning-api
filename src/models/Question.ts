import { Schema, model, Document, Types } from "mongoose";
import { IQuestion } from "../types/models";

interface IQuestionModel extends IQuestion, Document {}

const QuestionSchema = new Schema<IQuestionModel>(
  {
    topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    answerIndex: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<IQuestionModel>("Question", QuestionSchema);
