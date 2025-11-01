import express from "express";
import { checkoutController } from "../controllers/checkout.controller.js";
import protect from "../common/middleware/protect.middleware.js";

const router = express.Router();

router.get("/:id", protect, checkoutController.checkout);

export default router;
