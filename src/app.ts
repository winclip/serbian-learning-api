import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import { connectDB } from "./config/database";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI!);

app.get("/", (_req, res) => {
  res.send("Backend is running ");
});

export default app;
