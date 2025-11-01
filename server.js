import express from "express";
import "dotenv/config";
import cors from "cors";
import rootRouter from "./src/routers/root.router.js";
import fileUpload from "express-fileupload";
import { setupSwagger } from "./src/common/swagger/swagger.config.js";
import { PORT } from "./src/common/constant/config.constant.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json());

const port = PORT ?? 3000;

app.use(cookieParser());

app.use(fileUpload({ useTempFile: true }));

setupSwagger(app);

app.use(rootRouter);

app.listen(PORT, () => {
  console.log(`Dự án đang chạy trên PORT ${port}!`);
});
