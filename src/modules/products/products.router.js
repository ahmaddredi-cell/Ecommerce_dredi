import { Router } from "express";
import * as productsController from "./products.controller.js";
import { endPointProduct } from "./products.endpoints.js";
import { auth } from "../../middleware/auth.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
import * as validators from "./products.validation.js";
import { validation } from "../../middleware/validation.js";
const router = Router();
router.get("/", productsController.getProducts);
router.get("/:productId", productsController.getProduct);
router.post(
  "/",
  auth(endPointProduct.create),
  fileUpload(fileValidation.image).fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 4 },
  ]),
  validation(validators.createProduct),
  productsController.createProducts
);
router.get("/category/:categoryId", productsController.getProductWithCategory);

export default router;
