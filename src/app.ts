import express from "express";
import cors from "cors";
import apiRoutes from "./routes";
import dotenv from "dotenv";
import { connectDB } from "./config/database";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

connectDB(process.env.MONGO_URI!);

app.get("/", (_req, res) => {
  res.send("Backend is running ");
});

export default app;
