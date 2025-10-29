import { Sequelize, DataTypes } from 'sequelize';
import sequelize from "../sequelize/sequelize_connection.js";
const user = sequelize.define('user', {
	ID: 
	{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	manager_id:
	{
		type: DataTypes.INTEGER,
	},
	email:
	{
		type: DataTypes.STRING(255),
		unique: true,
	},
	full_name:
	{
		type: DataTypes.STRING(255),
	},
	status:
	{
		type: DataTypes.STRING(50),
	},
	created_date:
	{
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	last_login:
	{
		type: DataTypes.DATE,
	},
	phone_num:
	{
		type: DataTypes.STRING(20),
	},
	role_id:
	{
		type: DataTypes.INTEGER,
	},
},
	{
		tableName: 'user',
		timestamps: false
	});

export default user;
