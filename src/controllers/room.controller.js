import { roomService } from "../services/room.service.js";
import { handleSuccessResponse } from "../helper/handleResponse.js"

export const roomController = {
	getAll: async function (req, res, next) {
		try {
			const result = await roomService.getAll(req);
			const response = handleSuccessResponse(
				`Lấy tất cả phòng thành công`,
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch (err) {
			next(err);
		}
	},
	getRooms: async function (req, res, next) {
		try {
			const result = await roomService.getAll(req);
			const response = handleSuccessResponse(
				`Lấy phòng thành công`,
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch (err) {
			next(err);
		}
	},
	checkInByID: async function (req, res, next) {
		try {
			const result = await roomService.checkInByID(req);
			const response = handleSuccessResponse(
				`Check-in thành công`,
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch (err) {
			next(err);
		}
	},
	checkOutByID: async function (req, res, next) {
		try {
			const result = await roomService.checkOutByID(req);
			const response = handleSuccessResponse(
				`Check-out thành công`,
				undefined,
				result
			);
			res.status(response.code).json(response);
		}
		catch (err) {
			next(err);
		}
	},
};
