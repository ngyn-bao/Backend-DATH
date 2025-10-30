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
		if (!roomId) throw new BadRequestError("Vui lòng nhập id phòng");

		const room = await prisma.room.update({
			data: 
			{
				status: "occupied",
			},
			where:
			{
				id: roomID,
			}
		});

		await prisma.booking.update({
			data:
			{
				checkin_time: Date.now(),
			},
			where:
			{
				id: roomID,
			}
		})
	}
};
