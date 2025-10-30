import { PrismaClient } from '../../generated/prisma'
//const { PrismaClient } = require('./generated/prisma')
const prisma = new PrismaClient()
export const roomService = {
	getAllRooms: async function (req) {
		const result = await prisma.room.findMany();
		return {
			items: result || [],
		};
	},

	getRooms: async function (req) {
		if(req.query == []) return getAllRooms(req);

		const result = await prisma.room.findMany({
			where: req.query
		})

		return {
			items: result || [],
		};
	},

	checkInByID: async function (req) {
		const roomID = req.params.id;
		const result = await prisma.room.update({
			where: {
				id: roomID
			},
			data: {
				status: "occupied"
			}
		})
	},

	checkOutByID: async function (req) {
		const roomID = req.params.id;
		const result = await prisma.room.update({
			where: {
				id: roomID
			},
			data: {
				status: "unoccupied"
			}
		})
	},
};
