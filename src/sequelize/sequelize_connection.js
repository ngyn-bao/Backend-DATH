//code first
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("bt_sql", "root", "1234", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Kết nối db thành công !");
  })
  .catch((error) => {
    console.log(error);
    console.log("Kết nối không thành công!");
  });

export default sequelize;
