import { reportService } from "../services/report.service.js";
import { handleSuccessResponse } from "../helper/handleResponse.js"

export const reportController = {
	getUsageReport: async function (req, res, next) {
		try {
			const result = await reportService.getUsageReport(req);
			const response = handleSuccessResponse(
				'Lấy báo cáo thành công',
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch (err) {
			next(err);
		}
	},

	getEnergyReport: async function (req, res, next) {
		try{
			const result = await reportService.getEnergyReport(req);
			const response = handleSuccessResponse(
				`Lấy báo cáo thành công`,
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch(err) {
			next(err);
		}
	},

	createUsageReport: async function (req, res, next) {
		try{
			const result = await reportService.createUsageReport(req);
			const response = handleSuccessResponse(
				`Tạo báo cáo thành công`,
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch(err) {
			next(err);
		}
	},

	createEnergyReport: async function (req, res, next) {
		try{
			const result = await reportService.createEnergyReport(req);
			const response = handleSuccessResponse(
				`Tạo báo cáo thành công`,
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch(err) {
			next(err);
		}
	}
};
