import { Router } from "express";
import * as categriesController from "./categories.controller.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
const router = Router();
router.get("/", categriesController.getCategories);
router.post("/", fileUpload(fileValidation.image).single("image"), categriesController.createCategory);
export default router;
