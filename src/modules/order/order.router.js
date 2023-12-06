import { Router } from "express";
import * as orderController from "./order.controller.js";
import { endPointOrder } from "./order.endPoint.js";
import { auth } from "../../middleware/auth.js";
import * as validators from "./order.validation.js";
import { validation } from "../../middleware/validation.js";
const router = Router();

router.post("/", auth(endPointOrder.create), orderController.createOrder);
export default router;
