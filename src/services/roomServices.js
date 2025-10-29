import room from "../models/RoomModel.js"

export const roomService = {
	getAllRooms: async function (req) {
		const result = await room.findAll();
		return {
			items: result || [],
		};
	},

	getRoomsByStatus: async function (req)
	{
		const roomStatus = req.params.status;
		const result = await room.findAll({
			where: {
				status: roomStatus;
			}
		});
		return{
			items: result || []
		}

	}

	deleteRoomByID: async function (req) {
		const roomID = req.params.id;
		const result = await room.destroy({
			where:{
				id: roomID,
			},
		});
		return {
			items: result || [],
		};

	}
};
