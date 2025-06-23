import { Router } from "express";
import {
  getWords,
  createWord,
  updateWord,
  deleteWord,
} from "../controllers/word.controller";
import {
  createWordSchema,
  updateWordSchema,
} from "../validations/wordValidation";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.get("/", getWords);
router.post("/", validateRequest(createWordSchema), createWord);
router.put("/:id", validateRequest(updateWordSchema), updateWord);
router.delete("/:id", deleteWord);

export default router;
