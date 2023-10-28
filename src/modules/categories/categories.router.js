import { Router } from "express";
import * as categriesController from "./categories.controller.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
const router = Router();
router.get("/", categriesController.getCategories);
router.get("/active", categriesController.activeCategories);
router.get("/:id", categriesController.getSpecficCategories);

router.post("/", fileUpload(fileValidation.image).single("image"), categriesController.createCategory);
router.put("/:id", fileUpload(fileValidation.image).single("image"), categriesController.updateCategory);
export default router;
