import { Schema, model, Document, Types } from "mongoose";
import { IWord } from "../types/models";

interface IWordModel extends IWord, Document {
  topic: Types.ObjectId;
}

const WordSchema = new Schema<IWordModel>(
  {
    topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
    wordSr: { type: String, required: true },
    wordEn: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IWordModel>("Word", WordSchema);
