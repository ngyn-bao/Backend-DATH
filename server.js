import express from "express";
// import rootRouter from "./src/routers/rootRouter.js";
import defineAssociations from "./src/models/sequelizeConnections.js"
import user from "./src/models/userModel.js"
import role from "./src/models/roleModel.js"

const app = express();

app.use(express.json());
const PORT = 3000;

defineAssociations();

// app.use(rootRouter);

app.listen(PORT, () => {
  console.log("Dự án đang chạy trên PORT 3000");
});

/*
const role0 = await role.create(
	{
		role_name: "lmao"
	}
)
const role1 = await role.create(
	{
		role_name: "lmao1"
	}
)

const user0 = await user.create(
	{
		email: "lmao@lmdfdao.com",
		full_name: "lmao deng",
		status: "i hate myself",
		phone_num: "0000000",
		role_id: 1
	}
)
const user1 = await user.create(
	{
		email: "lmao@lmaodd.com",
		full_name: "lmao deng1",
		status: "i hate myself",
		phone_num: "0000000",
		role_id: 1
	}
)
const user2 = await user.create(
	{
		email: "lmao@lmao.ddcom",
		full_name: "lmao deng2",
		status: "i hate myself",
		phone_num: "0000000",
		role_id: 1
	}
)
const user3 = await user.create(
	{
		email: "lmao@lmao.codgdm",
		full_name: "lmao deng3",
		status: "i hate myself",
		phone_num: "0000000",
		role_id: 1
	}
)*/

const results = await user.findAll({
	where:
	{
		manager_id: 1
	}
})

console.log(results)
