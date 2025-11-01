import { reportService } from "../services/report.service.js";
import { handleSuccessResponse } from "../helpers/handleResponse.js";

export const reportController = {
  /**
   * @swagger
   * /report/usage/{id}:
   *   get:
   *     summary: Lấy báo cáo sử dụng phòng
   *     description: Lấy chi tiết báo cáo usage report theo ID
   *     tags: [Report]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID của usage report
   *     responses:
   *       200:
   *         description: Lấy báo cáo thành công
   *       400:
   *         description: Thiếu ID báo cáo
   *       404:
   *         description: Không tìm thấy báo cáo
   */

  getUsageReport: async function (req, res, next) {
    try {
      const result = await reportService.getUsageReport(req);
      const response = handleSuccessResponse(
        "Lấy báo cáo thành công",
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
   * /report/energy/{id}:
   *   get:
   *     summary: Lấy báo cáo năng lượng
   *     description: Lấy chi tiết báo cáo energy report theo ID
   *     tags: [Report]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID của energy report
   *     responses:
   *       200:
   *         description: Lấy báo cáo thành công
   *       400:
   *         description: Thiếu ID báo cáo
   *       404:
   *         description: Không tìm thấy báo cáo
   */

  getEnergyReport: async function (req, res, next) {
    try {
      const result = await reportService.getEnergyReport(req);
      const response = handleSuccessResponse(
        `Lấy báo cáo thành công`,
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
   * /report/usage:
   *   post:
   *     summary: Tạo báo cáo sử dụng phòng
   *     description: Tạo mới một usage report theo khoảng thời gian và user
   *     tags: [Report]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id
   *             properties:
   *               id:
   *                 type: integer
   *                 example: 123
   *               periodStart:
   *                 type: string
   *                 format: date-time
   *                 example: "2025-01-01T00:00:00.000Z"
   *               periodEnd:
   *                 type: string
   *                 format: date-time
   *                 example: "2025-01-31T23:59:59.000Z"
   *     responses:
   *       200:
   *         description: Tạo báo cáo thành công
   *       400:
   *         description: Thiếu dữ liệu hoặc dữ liệu không hợp lệ
   */
  createUsageReport: async function (req, res, next) {
    try {
      const result = await reportService.createUsageReport(req);
      const response = handleSuccessResponse(
        `Tạo báo cáo thành công`,
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
   * /report/energy:
   *   post:
   *     summary: Tạo báo cáo năng lượng
   *     description: Tạo mới một energy report theo khoảng thời gian và user
   *     tags: [Report]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id
   *             properties:
   *               id:
   *                 type: integer
   *                 example: 123
   *               periodStart:
   *                 type: string
   *                 format: date-time
   *                 example: "2025-01-01T00:00:00.000Z"
   *               periodEnd:
   *                 type: string
   *                 format: date-time
   *                 example: "2025-01-31T23:59:59.000Z"
   *     responses:
   *       200:
   *         description: Tạo báo cáo thành công
   *       400:
   *         description: Thiếu dữ liệu hoặc dữ liệu không hợp lệ
   */
  createEnergyReport: async function (req, res, next) {
    try {
      const result = await reportService.createEnergyReport(req);
      const response = handleSuccessResponse(
        `Tạo báo cáo thành công`,
        undefined,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
