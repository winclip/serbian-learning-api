import express from "express";
import cors from "cors";
import apiRoutes from "./routes";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app = express();

const allowedOriginsSet = new Set(
  process.env.CLIENT_ORIGINS?.split(",").map((o) => o.trim()) || []
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOriginsSet.has(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", apiRoutes);

connectDB(process.env.MONGO_URI!);

app.use(notFound);
app.use(errorHandler);

export default app;
