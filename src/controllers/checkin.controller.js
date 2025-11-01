import { checkinService } from "../services/checkin.service.js";
import { handleSuccessResponse } from "../helpers/handleResponse.js";

export const checkinController = {
  /**
   * @swagger
   * /checkin/{id}:
   *   get:
   *     summary: Checkin phòng
   *     description: Cập nhật trạng thái phòng thành "occupied" và ghi lại thời gian check-in cho booking tương ứng.
   *     tags: [Checkin / Checkout]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID của phòng đã book cần checkin
   *     responses:
   *       200:
   *         description: Checkin thành công
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
   *                   example: "Checkin thành công"
   *                 data:
   *                   type: object
   *                   nullable: true
   *       400:
   *         description: Yêu cầu không hợp lệ (ví dụ thiếu ID phòng)
   *       404:
   *         description: Không tìm thấy phòng hoặc booking tương ứng
   *       409:
   *         description: Phòng đã được checkin hoặc trạng thái không hợp lệ
   */
  checkin: async function (req, res, next) {
    try {
      const result = await checkinService.checkin(req);
      const response = handleSuccessResponse(
        `Checkin thành công`,
        undefined,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
