import { checkoutService } from "../services/checkout.service.js";
import { handleSuccessResponse } from "../helpers/handleResponse.js";

export const checkoutController = {
  /**
   * @swagger
   * /checkout/{id}:
   *   get:
   *     summary: Checkout phòng
   *     description: Cập nhật trạng thái phòng thành "unoccupied" và ghi lại thời gian checkout cho booking tương ứng.
   *     tags: [Checkin / Checkout]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID của phòng đã book cần checkout
   *     responses:
   *       200:
   *         description: Checkout thành công
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 code:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: "Checkout thành công"
   *                 data:
   *                   type: object
   *                   nullable: true
   *       400:
   *         description: Yêu cầu không hợp lệ (ví dụ thiếu ID phòng)
   *       404:
   *         description: Không tìm thấy phòng hoặc booking tương ứng
   *       409:
   *         description: Phòng đã được checkout hoặc trạng thái không hợp lệ
   */
  checkout: async function (req, res, next) {
    try {
      const result = await checkoutService.checkout(req);
      const response = handleSuccessResponse(
        `Checkout thành công`,
        undefined,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
