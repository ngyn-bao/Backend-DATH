import {bookingController} from "../controllers/booking.controller.js"
import express from "express";
import { bookingController } from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

// Tạo route CRUD
bookingRouter.post("/", bookingController.create);
// bookingRouter.get("/", bookingController.findAll);
// bookingRouter.get("/:id", bookingController.findOne);
// bookingRouter.patch("/:id", bookingController.update);
bookingRouter.delete("/:id", bookingController.remove);

export default bookingRouter;
