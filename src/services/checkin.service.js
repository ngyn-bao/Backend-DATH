import cloudinary from "../common/cloudinary/cloudinary.config.js";
import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const checkinService = {
	checkin: async function (req) {
		const roomID = req.params.id;
		if (!roomID) throw new BadRequestError("Vui lòng nhập id phòng");

		const room = await prisma.room.update({
			data: 
			{
				status: "occupied",
			},
			where:
			{
				ID: parseInt(roomID, 10),
			}
		});

		await prisma.booking.update({
			data:
			{
				checkin_time: new Date(Date.now()),
			},
			where:
			{
				ID: parseInt(roomID, 10),
			}
		})
	}
};
