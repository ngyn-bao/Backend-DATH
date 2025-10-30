import cloudinary from "../common/cloudinary/cloudinary.config.js";
import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const checkoutService = {
	checkout: async function (req) {
		const roomID = req.params.id;
		if (!roomId) throw new BadRequestError("Vui lòng nhập id phòng");

		await prisma.room.update({
			data: 
			{
				status: "unoccupied",
			}
			where:
			{
				id: roomID,
			}
		})

		await prisma.booking.update({
			data:
			{
				checkout_time: Date.now(),
			},
			where:
			{
				id: roomID,
			}
		})
	}
};
