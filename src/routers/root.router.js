import express from "express";
import authRouter from "./auth.router.js";
import bookingRouter from "./booking.router.js";
import studySpaceRouter from "./studyspace.route.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/rooms", studySpaceRouter);
rootRouter.use("/booking", bookingRouter);

export default rootRouter;
