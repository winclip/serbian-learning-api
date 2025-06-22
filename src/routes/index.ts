import { Router } from "express";
import wordRoutes from "./word.routes";
import topicRoutes from "./topic.routes";
import questionRoutes from "./question.routes";

const router = Router();

router.use("/words", wordRoutes);
router.use("/topics", topicRoutes);
router.use("/questions", questionRoutes);

export default router;
