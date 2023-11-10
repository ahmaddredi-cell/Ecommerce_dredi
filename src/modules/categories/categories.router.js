import { Router } from "express";
import * as categriesController from "./categories.controller.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
import subcategoryRouter from "./../subcategory/subcategory.router.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./categories.endpoint.js";
const router = Router();

router.use("/:id/subcategory", subcategoryRouter);
router.get("/", auth(endPoint.getAlls), categriesController.getCategories);
router.get("/active", auth(endPoint.getActive), categriesController.activeCategories);
router.get("/:id", auth(endPoint.specific), categriesController.getSpecficCategories);

router.post("/", auth(endPoint.create), fileUpload(fileValidation.image).single("image"), categriesController.createCategory);
router.put("/:id", auth(endPoint.update), fileUpload(fileValidation.image).single("image"), categriesController.updateCategory);
export default router;
