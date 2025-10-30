import { reportService } from "../services/room.service.js";
import { handleSuccessResponse } from "../helper/handlerResponse"

export const reportController = {
	getUsageReport: async function (req, res, next) {
		try {
			const result = await reportService.getUsageReport(req);
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
