import express from "express";
import { adminUserController } from "../controllers/adminUser.controller.js";
import protect from "../common/middleware/protect.middleware.js";
import checkPermission from "../common/middleware/check-permission.middleware.js";

const adminUserRouter = express.Router();

// Tạo route CRUD

adminUserRouter.post(
  "/",
  protect,
  checkPermission(["Admin"]),
  adminUserController.create,
);

adminUserRouter.get(
  "/",
  protect,
  checkPermission(["Admin", "IT Staff"]),
  adminUserController.findAll,
);

adminUserRouter.patch(
  "/status",
  protect,
  checkPermission(["Admin"]),
  adminUserController.update,
);

adminUserRouter.patch(
  "/reset-penalty",
  protect,
  checkPermission(["Admin"]),
  adminUserController.resetPenalty,
);

adminUserRouter.delete(
  "/",
  protect,
  checkPermission(["Admin"]),
  adminUserController.remove,
);

export default adminUserRouter;
