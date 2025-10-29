import room from "./roomModel.js"
import user from "./userModel.js"
import role from "./roleModel.js"


const defineAssociations = () =>
{
	user.hasOne(role, {foreignKey: "role_id"})
	role.belongsTo(user, {foreignKey: "role_id"})

	user.hasMany(user, {foreignKey: "manager_id"})
	user.belongsTo(user, {foreignKey: "manager_id"});
	
	//room to user
	user.hasMany(room, {foreignKey: "manager_id"});
	room.belongsTo(user, {foreignKey: "manager_id"});
}

export default defineAssociations
