import express from "express";
// import rootRouter from "./src/routers/rootRouter.js";

const app = express();

app.use(express.json());
const PORT = 3000;

//app.use(rootRouter);

app.listen(PORT, () => {
  console.log("Dự án đang chạy trên PORT 3000");
});


/*const h1101 = await room.create({
	status: "occupied",
	capacity: 50,
	type: "h1",
	name: "h1101",
	building: "h1",
	description: "h1 room",
	manager_id: 1,
})
const h1102 = await room.create({
	status: "free",
	capacity: 50,
	type: "h1",
	name: "h1102",
	building: "h1",
	description: "h1 room",
	manager_id: 1,
})
const h1103 = await room.create({
	status: "demolished",
	capacity: 50,
	type: "h1",
	name: "h1103",
	building: "h1",
	description: "h1 room",
	manager_id: 1,
})*/

const result = await room.findAll({
});

console.log(result)
