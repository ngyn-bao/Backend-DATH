import express from "express";
import authRouter from "./auth.router.js";
import bookingRouter from "./booking.router.js";
import studySpaceRouter from "./studyspace.router.js";
import checkinRouter from "./checkin.router.js";
import checkoutRouter from "./checkout.router.js";
import adminConfigRouter from "./adminConfig.router.js";
import adminUserRouter from "./adminUser.router.js";
import reportRouter from "./report.router.js";
import feedbackRouter from "./feedback.router.js"

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/study-space", studySpaceRouter);
rootRouter.use("/booking", bookingRouter);
rootRouter.use("/checkin", checkinRouter);
rootRouter.use("/checkout", checkoutRouter);
rootRouter.use("/admin-config", adminConfigRouter);
rootRouter.use("/admin-user", adminUserRouter);
rootRouter.use("/report", reportRouter);
rootRouter.use("/feedback", feedbackRouter);

export default rootRouter;
