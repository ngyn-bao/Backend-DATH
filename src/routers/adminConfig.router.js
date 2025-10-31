import express from "express";
import { adminConfigController } from "../controllers/adminConfig.controller.js";
import protect from "../common/middleware/protect.middleware.js";
import checkPermission from "../common/middleware/check-permission.middleware.js";

const adminConfigRouter = express.Router();

// Tạo route CRUD
adminConfigRouter.post(
  "/",
  protect,
  checkPermission(["Admin", "IT Staff"]),
  adminConfigController.create,
);
adminConfigRouter.get(
  "/",
  protect,
  checkPermission(["Admin", "IT Staff"]),
  adminConfigController.getAll,
);
// adminConfigRouter.get("/:id", adminConfigController.findOne);
adminConfigRouter.patch(
  "/update",
  protect,
  checkPermission(["Admin", "IT Staff"]),
  adminConfigController.update,
);
// adminConfigRouter.delete("/:id", adminConfigController.remove);

export default adminConfigRouter;
