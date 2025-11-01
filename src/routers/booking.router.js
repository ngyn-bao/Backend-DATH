import { bookingController } from "../controllers/booking.controller.js";
import express from "express";
import protect from "../common/middleware/protect.middleware.js";
import checkPermission from "../common/middleware/check-permission.middleware.js";

const bookingRouter = express.Router();

// Tạo route CRUD
bookingRouter.post(
  "/",
  protect,
  checkPermission(["Student", "Admin", "Lecturer"]),
  bookingController.create,
);
bookingRouter.get("/", protect, bookingController.findAll);

bookingRouter.get("/:id", protect, bookingController.findOne);

// bookingRouter.patch(
//   "/:id",
//   protect,
//   checkPermission(["Admin"]),
//   bookingController.update,
// );
bookingRouter.delete(
  "/:id",
  protect,
  checkPermission(["Student", "Admin", "Lecturer"]),
  bookingController.remove,
);

export default bookingRouter;
