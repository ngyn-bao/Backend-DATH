import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../helpers/handleResponse.js";
import { adminConfigService } from "../services/adminConfig.service.js";

export const adminConfigController = {
  /**
   * @swagger
   * /admin/configs:
   *   post:
   *     summary: Thêm mới cấu hình hệ thống
   *     tags: [Config Management]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               config_name:
   *                 type: string
   *               config_value:
   *                 type: string
   *               admin_id:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Tạo mới thành công
   */
  create: async function (req, res, next) {
    try {
      const result = await adminConfigService.create(req);
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
   * /admin/configs:
   *   get:
   *     summary: Lấy danh sách cấu hình hệ thống
   *     tags: [Config Management]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Danh sách cấu hình thành công
   */
  getAll: async function (req, res, next) {
    try {
      const result = await adminConfigService.getAll(req);
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

  // findOne: async function (req, res, next) {
  //   try {
  //     const result = await adminService.findOne(req);
  //     const response = responseSuccess(
  //       result,
  //       `Get entity #${req.params.id} successfully`,
  //     );
  //     res.status(response.code).json(response);
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  /**
   * @swagger
   * /admin/configs/{id}:
   *   put:
   *     summary: Cập nhật cấu hình hệ thống
   *     tags: [Config Management]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               config_value:
   *                 type: string
   *               admin_id:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Cập nhật thành công
   */
  update: async function (req, res, next) {
    try {
      const result = await adminConfigService.update(req);
      const response = handleSuccessResponse(
        `Update entity #${req.params.id} successfully`,
        200,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  // remove: async function (req, res, next) {
  //   try {
  //     const result = await adminService.remove(req);
  //     const response = responseSuccess(
  //       result,
  //       `Remove entity #${req.params.id} successfully`,
  //     );
  //     res.status(response.code).json(response);
  //   } catch (err) {
  //     next(err);
  //   }
  // },
};
