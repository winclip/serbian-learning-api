import { Router } from "express";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getRandomQuestions,
} from "../controllers/question.controller";
import { validateRequest } from "../middleware/validateRequest";
import {
  createQuestionSchema,
  updateQuestionSchema,
} from "../validations/questionValidation";

const router = Router();

router.get("/", getQuestions);
router.get("/random", getRandomQuestions);
router.post("/", validateRequest(createQuestionSchema), createQuestion);
router.put("/:id", validateRequest(updateQuestionSchema), updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
