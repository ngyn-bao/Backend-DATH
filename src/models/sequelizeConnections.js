import room from "./roomModel.js"


const defineAssociations = () =>
{
	user.hasMany(room, { foreignKey: "manager_id"});
	room.belongsTo(user, {foreignKey: "manager_id"});
}

export default defineAssociations
