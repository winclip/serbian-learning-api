import { Router } from "express";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getRandomQuestions,
} from "../controllers/question.controller";

const router = Router();

router.get("/", getQuestions);
router.get("/random", getRandomQuestions);
router.post("/", createQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
