import express from "express";
import { adminUserController } from "../controllers/adminUser.controller.js";
import protect from "../common/middleware/protect.middleware.js";
import checkPermission from "../common/middleware/check-permission.middleware.js";

const adminUserRouter = express.Router();

// Tạo route CRUD

adminUserRouter.post(
  "/users",
  protect,
  checkPermission(["Admin"]),
  adminUserController.create,
);

adminUserRouter.get(
  "/users",
  protect,
  checkPermission(["Admin", "IT Staff"]),
  adminUserController.findAll,
);

adminUserRouter.patch(
  "/users/status",
  protect,
  checkPermission(["Admin"]),
  adminUserController.update,
);

adminUserRouter.patch(
  "/users/reset-penalty",
  protect,
  checkPermission(["Admin"]),
  adminUserController.resetPenalty,
);

adminUserRouter.delete(
  "/users",
  protect,
  checkPermission(["Admin"]),
  adminUserController.remove,
);

export default adminUserRouter;
