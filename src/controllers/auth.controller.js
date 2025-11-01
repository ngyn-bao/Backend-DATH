import { handleSuccessResponse } from "../helpers/handleResponse.js";
import { authService } from "../services/auth.service.js";

export const authController = {
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Đăng ký tài khoản mới
   *     description: Tạo mới người dùng với email, mật khẩu, họ tên, số điện thoại và vai trò.
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *               - full_name
   *             properties:
   *               email:
   *                 type: string
   *                 example: user@example.com
   *               password:
   *                 type: string
   *                 example: 123456
   *               full_name:
   *                 type: string
   *                 example: Nguyễn Văn A
   *               phone_num:
   *                 type: string
   *                 example: "0909123456"
   *               role_id:
   *                 type: string
   *                 example: "1(Student) hoặc 2(Lecturer)"
   *     responses:
   *       200:
   *         description: Đăng ký thành công
   *       400:
   *         description: Dữ liệu không hợp lệ hoặc user đã tồn tại
   */
  register: async function (req, res, next) {
    try {
      const result = await authService.register(req);
      const response = handleSuccessResponse(
        `Register successfully`,
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
   * /auth/login:
   *   post:
   *     summary: Đăng nhập hệ thống
   *     description: Kiểm tra email và mật khẩu, trả về accessToken và refreshToken nếu hợp lệ.
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 example: user@example.com
   *               password:
   *                 type: string
   *                 example: 123456
   *     responses:
   *       200:
   *         description: Đăng nhập thành công
   *       400:
   *         description: Sai mật khẩu hoặc dữ liệu không hợp lệ
   *       404:
   *         description: Không tìm thấy tài khoản
   */
  login: async function (req, res, next) {
    try {
      const result = await authService.login(req, res);
      const response = handleSuccessResponse(`Login successfully`, 200, result);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /auth/refresh-token:
   *   post:
   *     summary: Lấy access token mới
   *     description: Sử dụng refresh token trong cookie để cấp lại access token mới.
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: Trả về access token mới
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *       401:
   *         description: Không có refresh token hoặc token không hợp lệ
   */
  refreshToken: async function (req, res, next) {
    try {
      const result = await authService.refreshToken(req, res);
      const response = handleSuccessResponse(`Login successfully`, 200, result);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /auth/delete-token:
   *   delete:
   *     summary: Xóa refresh token
   *     description: Xóa refresh token cookie và kết thúc phiên đăng nhập (client side thực hiện).
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: Đăng xuất thành công
   */
  deleteToken: async function (req, res, next) {
    try {
      const result = await authService.deleteToken(req, res);
      const response = handleSuccessResponse(`Login successfully`, 200, result);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
