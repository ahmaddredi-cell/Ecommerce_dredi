import { Router } from "express";
import * as subCategriesController from "./subcategory.controller.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
const router = Router();

router.post("/", fileUpload(fileValidation.image).single("image"), subCategriesController.createSubCategory);

export default router;
