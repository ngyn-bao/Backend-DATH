import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const feedbackService = {
	getFeedback: async function (req) {
		const userID = req.params.id;
		if (!userID) throw new BadRequestError("Vui lòng nhập id người dùng");

		const feedback = prisma.feedback.findMany({
			where:{
				booking_id: userID
			}
		})

		return {feedback};
	},
	createFeedback: async function (req){
		const {
			id,
			rating,
			comment,
			created_at,
			booking_id
		} = req.params.body;
		if (!userID) throw new BadRequestError("Vui lòng nhập id người dùng");

		const feedback = prisma.feedback.create({
			where:{
				booking_id: userID
			}
		})

		return {feedback};
	}
};
