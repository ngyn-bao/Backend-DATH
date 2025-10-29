import express from "express";
// import rootRouter from "./src/routers/rootRouter.js";
import defineAssociations from "./src/models/sequelizeConnections.js"

const app = express();

app.use(express.json());
const PORT = 3000;

defineAssociations();

// app.use(rootRouter);

app.listen(PORT, () => {
  console.log("Dự án đang chạy trên PORT 3000");
});
