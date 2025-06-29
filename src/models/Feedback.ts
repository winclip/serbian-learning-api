import mongoose, { Schema, Document } from "mongoose";

export interface IFeedback extends Document {
  name: string;
  email: string;
  comment: string;
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFeedback>("Feedback", FeedbackSchema);
