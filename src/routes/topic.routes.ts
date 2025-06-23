import { Router } from "express";
import {
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../controllers/topic.controller";
import { validateRequest } from "../middleware/validateRequest";
import {
  createTopicSchema,
  updateTopicSchema,
} from "../validations/topicValidation";

const router = Router();

router.get("/", getTopics);
router.post("/", validateRequest(createTopicSchema), createTopic);
router.put("/:id", validateRequest(updateTopicSchema), updateTopic);
router.delete("/:id", deleteTopic);

export default router;
