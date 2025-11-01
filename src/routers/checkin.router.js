import express from "express";
import { checkinController } from "../controllers/checkin.controller.js";
import protect from "../common/middleware/protect.middleware.js";

const checkinRouter = express.Router();

checkinRouter.get("/:id", protect, checkinController.checkin);

export default checkinRouter;
