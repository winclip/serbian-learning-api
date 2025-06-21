import { Router } from "express";
import wordRoutes from "./word.routes";
import topicRoutes from "./topic.routes";

const router = Router();

router.use("/words", wordRoutes);
router.use("/topics", topicRoutes);

export default router;
