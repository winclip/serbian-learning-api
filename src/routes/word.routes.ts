import { Router } from "express";
import {
  getWords,
  createWord,
  updateWord,
  deleteWord,
} from "../controllers/word.controller";

const router = Router();

router.get("/", getWords);
router.post("/", createWord);
router.put("/:id", updateWord);
router.delete("/:id", deleteWord);

export default router;
