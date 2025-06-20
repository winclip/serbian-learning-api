import { Schema, model, Document } from "mongoose";
import { ITopic } from "../types/models";

interface ITopicModel extends ITopic, Document {}

const TopicSchema = new Schema<ITopicModel>(
  {
    nameSr: { type: String, required: true },
    nameEn: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<ITopicModel>("Topic", TopicSchema);
