import { Router } from "express";
import wordRoutes from "./word.routes";

const router = Router();

router.use("/words", wordRoutes);

export default router;
