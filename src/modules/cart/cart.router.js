import { Router } from "express";
import * as cartController from "./cart.controller.js";
import { endPointcart } from "./cart.endpoint.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post("/", auth(endPointcart.create), cartController.createCart);
router.patch("/removeItem", auth(endPointcart.delete), cartController.removeItem);
router.delete("/clear", auth(endPointcart.clear), cartController.clearCart);
router.get("/", auth(endPointcart.get), cartController.getCart);
export default router;
