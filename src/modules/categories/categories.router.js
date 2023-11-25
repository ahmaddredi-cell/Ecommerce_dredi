import { Router } from "express";
import * as categriesController from "./categories.controller.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
import subcategoryRouter from "./../subcategory/subcategory.router.js";
import { auth } from "../../middleware/auth.js";
import { endPointcategory } from "./categories.endpoint.js";

const router = Router();

router.use("/:id/subcategory", subcategoryRouter);
router.get("/", auth(), categriesController.getCategories);
router.get("/active", auth(endPointcategory.getActive), categriesController.activeCategories);
router.get("/:id", auth(endPointcategory.specific), categriesController.getSpecficCategories);

router.post("/", auth(endPointcategory.create), fileUpload(fileValidation.image).single("image"), categriesController.createCategory);
router.put("/:id", auth(endPointcategory.update), fileUpload(fileValidation.image).single("image"), categriesController.updateCategory);
export default router;
