import express from "express";
// import rootRouter from "./src/routers/rootRouter.js";

const app = express();

app.use(express.json());
const PORT = 3000;

// app.use(rootRouter);

app.listen(PORT, () => {
  console.log("Dự án đang chạy trên PORT 3000");
});
