import { Router } from "express";
import * as subCategriesController from "./subcategory.controller.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
const router = Router({ mergeParams: true });

router.post("/", fileUpload(fileValidation.image).single("image"), subCategriesController.createSubCategory);

router.get("/", subCategriesController.getSubcategories);
export default router;
