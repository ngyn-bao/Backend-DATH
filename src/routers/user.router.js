import express from "express";
import protect from "../common/middleware/protect.middleware.js";
import { userController } from "../controllers/user.controller.js";

const userRouter = express.Router();

// Tạo route CRUD
userRouter.get("/:id", protect, userController.findOne);
userRouter.patch("/:id", protect, userController.update);
userRouter.patch(
  "/:id/change-password",
  protect,
  userController.changePassword,
);

export default userRouter;
