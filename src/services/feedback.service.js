import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const feedbackService = {
	getFeedback: async function (req) {
		const feedbackID = req.params.id;
		if (!feedbackID) throw new BadRequestError("Vui lòng nhập id của phản hồi");

		const feedback = await prisma.feedback.findUnique({
			where:{
				ID: feedbackID
			}
		})

		return {feedback};
	},
	getFeedbackOfBooking: async function (req) {
		const bookingID = req.params.id;
		if (!feedbackID) throw new BadRequestError("Vui lòng nhập id của lần booking");

		const feedback = await prisma.feedback.findMany({
			where:{
				booking_id: bookingID
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

		const feedback = await prisma.feedback.create({
			data:{
				id: id,
				rating: rating,
				comment: comment,
				created_at: created_at,
				booking_id: booking_id
			}
		})

		return {feedback};
	}
};
