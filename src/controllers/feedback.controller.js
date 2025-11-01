import { feedbackService } from "../services/feedback.service.js";
import { handleSuccessResponse } from "../helpers/handleResponse.js";

export const feedbackController = {
  /**
   * @swagger
   * /feedback/{id}:
   *   get:
   *     summary: Lấy thông tin một phản hồi
   *     description: Lấy chi tiết phản hồi theo ID
   *     tags: [Feedback]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID của phản hồi
   *     responses:
   *       200:
   *         description: Lấy phản hồi thành công
   *       400:
   *         description: Thiếu ID phản hồi
   *       404:
   *         description: Không tìm thấy phản hồi
   */
  getFeedback: async function (req, res, next) {
    try {
      const result = await feedbackService.getFeedback(req);
      const response = handleSuccessResponse(
        "Lấy phản hồi thành công",
        undefined,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /feedback/booking/{id}:
   *   get:
   *     summary: Lấy tất cả phản hồi của một booking
   *     description: Lấy danh sách phản hồi liên quan đến một booking theo ID
   *     tags: [Feedback]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID của booking
   *     responses:
   *       200:
   *         description: Lấy phản hồi thành công
   *       400:
   *         description: Thiếu ID booking
   *       404:
   *         description: Không tìm thấy phản hồi cho booking
   */
  getFeedbackOfBooking: async function (req, res, next) {
    try {
      const result = await feedbackService.getFeedbackOfBooking(req);
      const response = handleSuccessResponse(
        "Lấy phản hồi thành công",
        undefined,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /feedback:
   *   post:
   *     summary: Tạo phản hồi mới
   *     description: Tạo một phản hồi mới liên quan đến một booking
   *     tags: [Feedback]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - rating
   *               - booking_id
   *             properties:
   *               rating:
   *                 type: integer
   *                 example: 5
   *               comment:
   *                 type: string
   *                 example: "Phòng rất đẹp và sạch sẽ"
   *               booking_id:
   *                 type: integer
   *                 example: 123
   *     responses:
   *       200:
   *         description: Tạo phản hồi thành công
   *       400:
   *         description: Thiếu dữ liệu hoặc dữ liệu không hợp lệ
   *       404:
   *         description: Không tìm thấy booking
   */
  createFeedback: async function (req, res, next) {
    try {
      const result = await feedbackService.createFeedback(req);
      const response = handleSuccessResponse(
        `Tạo phản hồi thành công`,
        undefined,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
