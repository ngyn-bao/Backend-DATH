import checkPermission from "../common/middleware/check-permission.middleware.js";
import protect from "../common/middleware/protect.middleware.js";
import { feedbackController } from "../controllers/feedback.controller.js";
import express from "express";

const feedbackRouter = express.Router();

feedbackRouter.get("/:id", protect, feedbackController.getFeedback);
feedbackRouter.get(
  "/booking/:id",
  protect,
  feedbackController.getFeedbackOfBooking,
);
feedbackRouter.post("/", protect, feedbackController.createFeedback);

export default feedbackRouter;
