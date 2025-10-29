import { Sequelize, DataTypes } from 'sequelize';
import sequelize from "../sequelize/sequelize_connection.js";
const room = sequelize.define('room', {
	ID: 
	{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	status:
	{
		type: DataTypes.STRING(50),
	},
	capacity:
	{
		type: DataTypes.INTEGER,
	},
	type:
	{
		type: DataTypes.STRING(100),
	},
	name:
	{
		type: DataTypes.STRING(255),
	},
	building:
	{
		type: DataTypes.STRING(255),
	},
	description:
	{
		type: DataTypes.STRING
	},
	manager_id:
	{
		type: DataTypes.INTEGER
	},

	freezeTableName: true
});

export default room;
