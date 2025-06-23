import express from "express";
import cors from "cors";
import apiRoutes from "./routes";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

connectDB(process.env.MONGO_URI!);

app.use(notFound);

app.use(errorHandler);

export default app;
