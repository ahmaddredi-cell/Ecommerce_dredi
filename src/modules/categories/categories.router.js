import { Router } from "express";
import * as categriesController from "./categories.controller.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
import subcategoryRouter from "./../subcategory/subcategory.router.js";
import { auth, roles } from "../../middleware/auth.js";
import { endPointcategory } from "./categories.endpoint.js";
import * as validators from "./category.validation.js";
import { validation } from "../../middleware/validation.js";
import { asyncHandler } from "../../services/errorHandling.js";

const router = Router();

router.use("/:id/subcategory", subcategoryRouter);
//asyncHandler to show any category to user not necessary logingin
router.get("/", asyncHandler(categriesController.getCategories));
router.get("/active", auth(endPointcategory.getActive), categriesController.activeCategories);
router.get("/:id", auth(Object.values(roles)), validation(validators.getSpecficCategories), categriesController.getSpecficCategories);

router.post(
  "/",
  auth(endPointcategory.create),

  fileUpload(fileValidation.image).array("image"),
  validation(validators.createCategory),
  categriesController.createCategory
);
router.put("/:id", auth(endPointcategory.update), fileUpload(fileValidation.image).single("image"), categriesController.updateCategory);
export default router;
