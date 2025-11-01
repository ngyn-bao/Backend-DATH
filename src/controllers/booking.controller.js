import { handleSuccessResponse } from "../helpers/handleResponse.js";
import { bookingService } from "../services/booking.service.js";

export const bookingController = {
  /**
   * @swagger
   * /booking:
   *   post:
   *     summary: Tạo mới lịch đặt phòng
   *     description: Người dùng đặt phòng trong khoảng thời gian cụ thể, kiểm tra trùng lịch trước khi tạo.
   *     tags: [Booking]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - room_id
   *               - booking_user
   *               - start_time
   *               - end_time
   *             properties:
   *               room_id:
   *                 type: integer
   *                 example: 3
   *               booking_user:
   *                 type: integer
   *                 example: 7
   *               start_time:
   *                 type: string
   *                 format: date-time
   *                 example: "2025-10-30T08:00:00.000Z"
   *               end_time:
   *                 type: string
   *                 format: date-time
   *                 example: "2025-10-30T10:00:00.000Z"
   *     responses:
   *       200:
   *         description: Đặt phòng thành công
   *       400:
   *         description: Phòng bị trùng lịch hoặc dữ liệu không hợp lệ
   *       404:
   *         description: Không tìm thấy phòng
   */
  create: async function (req, res, next) {
    try {
      const result = await bookingService.create(req);
      const response = handleSuccessResponse(
        `Create entity successfully`,
        200,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /booking:
   *   get:
   *     summary: Lấy danh sách tất cả booking
   *     description: Trả về danh sách tất cả các lịch đặt phòng có trong hệ thống.
   *     tags: [Booking]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lấy danh sách booking thành công.
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
   *                   example: Get all entity successfully
   *                 data:
   *                   type: object
   *                   properties:
   *                     bookingList:
   *                       type: array
   *                       items:
   *                         $ref: '#/components/schemas/Booking'
   *       404:
   *         description: Không tìm thấy booking nào trong hệ thống.
   */
  findAll: async function (req, res, next) {
    try {
      const result = await bookingService.findAll(req);
      const response = handleSuccessResponse(
        `Get all entity successfully`,
        200,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /booking/{id}:
   *   get:
   *     summary: Lấy thông tin chi tiết của một booking
   *     description: Trả về thông tin chi tiết của một booking dựa theo ID.
   *     tags: [Booking]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID của booking cần lấy
   *     responses:
   *       200:
   *         description: Lấy thông tin booking thành công.
   *       400:
   *         description: Thiếu hoặc sai ID booking.
   *       404:
   *         description: Không tìm thấy booking tương ứng với ID.
   */
  findOne: async function (req, res, next) {
    try {
      const result = await bookingService.findOne(req);
      const response = handleSuccessResponse(
        `Get entity #${req.params.id} successfully`,
        200,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  // update: async function (req, res, next) {
  //   try {
  //     const result = await bookingService.update(req);
  //     const response = responseSuccess(
  //       result,
  //       `Update entity #${req.params.id} successfully`,
  //     );
  //     res.status(response.code).json(response);
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  /**
   * @swagger
   * /booking/{id}:
   *   delete:
   *     summary: Hủy lịch đặt phòng
   *     description: Hủy một lịch đặt phòng theo ID, đồng thời cập nhật trạng thái phòng về "Available".
   *     tags: [Booking]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID của lịch đặt cần hủy
   *     responses:
   *       200:
   *         description: Hủy lịch đặt thành công
   *       400:
   *         description: Thiếu ID hoặc dữ liệu không hợp lệ
   *       404:
   *         description: Không tìm thấy lịch đặt
   */
  remove: async function (req, res, next) {
    try {
      const result = await bookingService.remove(req);
      const response = handleSuccessResponse(
        `Remove entity #${req.params.id} ,successfully`,
        200,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
