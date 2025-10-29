import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const room = sequelize.define('Room', {
	ID: 
	{
		type: DataTypes.INT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	status:
	{
		type: DataTypes.STRING
	},
	capacity:
	{
		type: DataTypes.INT
	},
	type:
	{
		type: DataTypes.STRING
	},
	name:
	{
		type: DataTypes.STRING
	},
	building:
	{
		type: DataTypes.STRING
	},
	description:
	{
		type: DataTypes.STRING
	},
	manager_id:
	{
		type: DataTypes.INT
	}
});
