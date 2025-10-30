import express from "express";
import authRouter from "./auth.router.js";
import bookingRouter from "./booking.router.js";
import studySpaceRouter from "./studyspace.router.js";
import checkinRouter from "./checkin.router.js";
import checkoutRouter from "./checkout.router.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/rooms", studySpaceRouter);
rootRouter.use("/booking", bookingRouter);
rootRouter.use("/checkin", checkinRouter);
rootRouter.use("/checkout", checkoutRouter);

export default rootRouter;
