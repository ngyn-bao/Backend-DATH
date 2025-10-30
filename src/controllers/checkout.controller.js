import { checkoutService } from "../services/checkout.service.js";
import { handleSuccessResponse } from "../helper/handleResponse.js"

export const checkoutController = {
	checkout: async function (req, res, next) {
		try {
			const result = await checkoutService.checkout(req);
			const response = handleSuccessResponse(
				`Checkout thành công`,
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
