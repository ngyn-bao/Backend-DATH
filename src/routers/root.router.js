import express from "express";
import authRouter from "./auth.router.js";
import bookingRouter from "./booking.router.js";
import studySpaceRouter from "./studyspace.route.js";
import adminConfigRouter from "./adminConfig.router.js";
import adminUserRouter from "./adminUser.router.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/study-space", studySpaceRouter);
rootRouter.use("/booking", bookingRouter);
rootRouter.use("/admin-config", adminConfigRouter);
rootRouter.use("/admin-user", adminUserRouter);

export default rootRouter;
