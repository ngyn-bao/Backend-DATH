import { bookingService } from "../services/booking.service.js";

export const bookingController = {
  /**
   * @swagger
   * /booking:
   *   post:
   *     summary: Tạo mới lịch đặt phòng
   *     description: Người dùng đặt phòng trong khoảng thời gian cụ thể, kiểm tra trùng lịch trước khi tạo.
   *     tags: [Booking]
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
      const response = responseSuccess(result, `Create entity successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  // findAll: async function (req, res, next) {
  //   try {
  //     const result = await bookingService.findAll(req);
  //     const response = responseSuccess(result, `Get all entity successfully`);
  //     res.status(response.code).json(response);
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // findOne: async function (req, res, next) {
  //   try {
  //     const result = await bookingService.findOne(req);
  //     const response = responseSuccess(
  //       result,
  //       `Get entity #${req.params.id} successfully`,
  //     );
  //     res.status(response.code).json(response);
  //   } catch (err) {
  //     next(err);
  //   }
  // },

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
      const response = responseSuccess(
        result,
        `Remove entity #${req.params.id} successfully`,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
