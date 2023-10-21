import { Router } from "express";
import * as categriesController from "./categories.controller.js";
const router = Router();
router.get("/", categriesController.getCategories);
export default router;
