import { Sequelize, DataTypes } from 'sequelize';
import sequelize from "../sequelize/sequelize_connection.js";

const role = sequelize.define('role', {
	ID:
	{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	role_name:
	{
		type: DataTypes.STRING,
		allowNull: false
	}
},
	{
		tableName: 'role',
		timestamps: false
	}
);

export default role;
