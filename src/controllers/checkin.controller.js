import { checkinService } from "../services/checkin.service.js";
import { handleSuccessResponse } from "../helpers/handleResponse.js"

export const checkinController = {
	checkin: async function (req, res, next) {
		try {
			const result = await checkinService.checkin(req);
			const response = handleSuccessResponse(
				`Checkin thành công`,
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
