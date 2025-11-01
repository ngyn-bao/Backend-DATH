import { handleErrorResponse } from "../helpers/handleResponse.js";
import { adminUserService } from "../services/adminUser.service.js";

export const adminUserController = {
  /**
   * @swagger
   * /admin/users:
   *   post:
   *     summary: Tạo mới người dùng
   *     tags: [User Management]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [full_name, email, password, role_id, admin_id]
   *             properties:
   *               full_name:
   *                 type: string
   *                 example: Nguyễn Văn A
   *               email:
   *                 type: string
   *                 example: nguyenvana@example.com
   *               password:
   *                 type: string
   *                 example: 123456
   *               role_id:
   *                 type: integer
   *                 example: 2
   *               admin_id:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       200:
   *         description: Tạo người dùng thành công
   *       400:
   *         description: Thiếu dữ liệu hoặc email đã tồn tại
   */
  create: async function (req, res, next) {
    try {
      const result = await adminUserService.create(req);
      const response = handleErrorResponse(
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
   * /admin/users:
   *   get:
   *     summary: Lấy danh sách tất cả người dùng
   *     tags: [User Management]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lấy danh sách thành công
   */
  findAll: async function (req, res, next) {
    try {
      const result = await adminUserService.findAll(req);
      const response = handleErrorResponse(
        `Get all entity successfully`,
        200,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  //   findOne: async function (req, res, next) {
  //     try {
  //       const result = await adminUserService.findOne(req);
  //       const response = responseSuccess(
  //         result,
  //         `Get entity #${req.params.id} successfully`,
  //       );
  //       res.status(response.code).json(response);
  //     } catch (err) {
  //       next(err);
  //     }
  //   },

  /**
   * @swagger
   * /admin/users/status:
   *   patch:
   *     summary: Cập nhật trạng thái hoặc vai trò người dùng
   *     tags: [User Management]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [userId, admin_id]
   *             properties:
   *               userId:
   *                 type: integer
   *                 example: 3
   *               status:
   *                 type: string
   *                 enum: [Active, Locked]
   *                 example: Locked
   *               role_id:
   *                 type: integer
   *                 example: 2
   *               admin_id:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       200:
   *         description: Cập nhật thành công
   */
  update: async function (req, res, next) {
    try {
      const result = await adminUserService.update(req);
      const response = handleErrorResponse(
        `Update entity #${req.body.userId} successfully`,
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
   * /admin/users/reset-penalty:
   *   patch:
   *     summary: Reset toàn bộ vi phạm của người dùng
   *     tags: [User Management]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [userId, admin_id]
   *             properties:
   *               userId:
   *                 type: integer
   *                 example: 4
   *               admin_id:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       200:
   *         description: Reset vi phạm thành công
   *       404:
   *         description: Người dùng không có vi phạm
   */
  resetPenalty: async function (req, res, next) {
    try {
      const result = await adminUserService.resetPenalty(req);
      const response = handleErrorResponse(
        `Update entity #${req.body.userId} successfully`,
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
   * /admin/users:
   *   delete:
   *     summary: Xóa người dùng
   *     tags: [User Management]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [userId, admin_id]
   *             properties:
   *               userId:
   *                 type: integer
   *                 example: 5
   *               admin_id:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       200:
   *         description: Xóa thành công
   *       404:
   *         description: Không tìm thấy người dùng
   */
  remove: async function (req, res, next) {
    try {
      const result = await adminUserService.remove(req);
      const response = handleErrorResponse(
        `Remove entity #${req.body.userId} successfully`,
        200,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
