import { feedbackService } from "../services/feedback.service.js";
import { handleSuccessResponse } from "../helper/handleResponse.js"

export const feedbackController = {
	getFeedback: async function (req, res, next) {
		try {
			const result = await feedbackService.getFeedback(req);
			const response = handleSuccessResponse(
				'Lấy phản hồi thành công',
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch (err) {
			next(err);
		}
	},
	getFeedbackOfBooking: async function (req, res, next) {
		try {
			const result = await feedbackService.getFeedbackOfBooking(req);
			const response = handleSuccessResponse(
				'Lấy phản hồi thành công',
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch (err) {
			next(err);
		}
	},

	createFeedback: async function (req, res, next) {
		try{
			const result = await feedbackService.createFeedback(req);
			const response = handleSuccessResponse(
				`Tạo phản hồi thành công`,
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch(err) {
			next(err);
		}
	},
};
