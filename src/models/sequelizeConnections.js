import room from "./roomModel.js"
import user from "./userModel.js"


const defineAssociations = () =>
{
	user.hasMany(room, { foreignKey: "manager_id"});
	room.belongsTo(user, {foreignKey: "manager_id"});
}

export default defineAssociations
