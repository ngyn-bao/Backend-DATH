import express from "express";
import roomRouter from "./src/routers/room.router.js"
// import rootRouter from "./src/routers/rootRouter.js";

const app = express();

app.use(express.json());
app.use()
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Dự án đang chạy trên PORT 3000");
});
