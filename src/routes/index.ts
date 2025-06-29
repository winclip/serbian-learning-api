import { Router } from "express";
import wordRoutes from "./word.routes";
import topicRoutes from "./topic.routes";
import questionRoutes from "./question.routes";
import feedbackRoutes from "./feedback.routes";

const router = Router();

router.use("/words", wordRoutes);
router.use("/topics", topicRoutes);
router.use("/questions", questionRoutes);
router.use("/feedback", feedbackRoutes);

export default router;
