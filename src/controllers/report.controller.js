import { reportService } from "../services/room.service.js";
import { handleSuccessResponse } from "../helper/handlerResponse"

export const reportController = {
	getAll: async function (req, res, next) {
		try {
			const result = await reportService.getAll(req);
			const response = handleSuccessResponse(
				`Lấy báo cáo theo user thành công`,
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch (err) {
			next(err);
		}
	},
	report: async function (req, res, next) {
		try {
			const result = await reportService.report(req);
			const response = handleSuccessResponse(
				`Báo cáo thành công`,
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch (err) {
			next(err);
		}
	}
};
