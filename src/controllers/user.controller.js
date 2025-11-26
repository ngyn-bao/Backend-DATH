import { handleSuccessResponse } from "../helpers/handleResponse.js";
import { userService } from "../services/user.service.js";

export const userController = {
  /**
   * @swagger
   * /user/{id}:
   *   get:
   *     summary: Lấy thông tin 1 user
   *     tags: [User]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID user
   *     responses:
   *       200:
   *         description: Lấy user thành công
   *       404:
   *         description: User không tồn tại
   */
  findOne: async function (req, res, next) {
    try {
      const result = await userService.findOne(req);
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

  /**
   * @swagger
   * /user/{id}:
   *   patch:
   *     summary: Cập nhật thông tin user
   *     tags: [User]
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
   *             required:
   *               - full_name
   *               - email
   *               - phone_num
   *             properties:
   *               full_name:
   *                 type: string
   *               email:
   *                 type: string
   *               phone_num:
   *                 type: string
   *     responses:
   *       200:
   *         description: Update user thành công
   *       400:
   *         description: Lỗi yêu cầu
   *       404:
   *         description: Không tìm thấy user
   */
  update: async function (req, res, next) {
    try {
      const result = await userService.update(req);
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

  /**
   * @swagger
   * /user/{id}/change-password:
   *   patch:
   *     summary: Đổi mật khẩu user
   *     tags: [User]
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
   *             required:
   *               - password
   *             properties:
   *               password:
   *                 type: string
   *                 minLength: 6
   *     responses:
   *       200:
   *         description: Đổi mật khẩu thành công
   *       400:
   *         description: Mật khẩu không hợp lệ
   *       404:
   *         description: Không tìm thấy user
   */
  changePassword: async function (req, res, next) {
    try {
      const result = await userService.changePassword(req);
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
};
