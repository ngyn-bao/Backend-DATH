import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const user = sequelize.define('User', {
	ID: 
	{
		type: DataTypes.INT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	manager_id:
	{
		type: DataTypes.INT,
	}
	email:
	{
		type: DataTypes.STRING,
		unique: true,
	}
	full_name:
	{
		type: DataTypes.STRING,
	}
	status:
	{
		type: DataTypes.STRING,
	}
	created_date:
	{
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	}
	last_login:
	{
		type: DataTypes.DATE,
	}
	phone_num:
	{
		type: DataTypes.STRING,
	}
	role_id:
	{
		type: DataTypes.INT,
	}
});

export default user;
