import express from "express";
import "dotenv/config";
import cors from "cors";
import rootRouter from "./src/routers/root.router.js";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors());

app.use(express.json());
const PORT = process.env.PORT ?? 3000;

app.use(rootRouter);

app.use(fileUpload({ useTempFile: true }));

app.listen(PORT, () => {
  console.log(`Dự án đang chạy trên PORT ${PORT}!`);
});
