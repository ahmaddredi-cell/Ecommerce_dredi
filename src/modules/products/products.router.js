import { Router } from "express";
import * as productsController from "./products.controller.js";
import { endPointProduct } from "./products.endpoints.js";
import { auth } from "../../middleware/auth.js";
import fileUpload, { fileValidation } from "../../services/multer.js";

const router = Router();
router.get("/", productsController.getProducts);
router.post(
  "/",
  auth(endPointProduct.create),
  fileUpload(fileValidation.image).fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 4 },
  ]),
  productsController.createProducts
);

export default router;
