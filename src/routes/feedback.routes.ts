import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { createFeedbackSchema } from "../validations/feedbackValidation";
import { createFeedback } from "../controllers/feedback.controller";

const router = Router();

router.post("/", validateRequest(createFeedbackSchema), createFeedback);

export default router;
