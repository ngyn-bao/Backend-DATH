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
		if (!roomID) throw new BadRequestError("Vui lòng nhập id phòng");

		await prisma.room.update({
			data: 
			{
				status: "unoccupied",
			},
			where:
			{
				ID: roomID,
			}
		})

		await prisma.booking.update({
			data:
			{
				checkout_time: new Date(Date.now()),
			},
			where:
			{
				ID: roomID,
			}
		})
	}
};
