import { handleSuccessResponse } from "../helpers/handleResponse.js";
import { studySpaceService } from "../services/studyspace.service.js";

export const studySpaceController = {
  /**
   * @swagger
   * /study-space:
   *   post:
   *     summary: Tạo phòng học mới (Study Space)
   *     tags: [Study Space / Room Management]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               building:
   *                 type: string
   *               capacity:
   *                 type: integer
   *               type:
   *                 type: string
   *               description:
   *                 type: string
   *               manager_id:
   *                 type: integer
   *               devices:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     name: { type: string }
   *                     type: { type: string }
   *                     description: { type: string }
   *                     energy_consumption: { type: number }
   *     responses:
   *       200:
   *         description: Tạo phòng học thành công
   *       400:
   *         description: Dữ liệu không hợp lệ
   */
  create: async function (req, res, next) {
    try {
      const result = await studySpaceService.create(req);
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
   * /study-space/{id}/upload:
   *   post:
   *     summary: Upload hình ảnh cho phòng học
   *     tags: [Study Space / Room Management]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID của phòng học
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               images:
   *                 type: array
   *                 items:
   *                   type: string
   *                   format: binary
   *     responses:
   *       200:
   *         description: Upload ảnh thành công
   *       400:
   *         description: Lỗi yêu cầu
   */
  upload: async function (req, res, next) {
    try {
      const result = await studySpaceService.upload(req);
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
   * /study-space/{id}/iot-map:
   *   post:
   *     summary: Gắn thiết bị IoT vào phòng học
   *     tags: [Study Space / Room Management]
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
   *               deviceIds:
   *                 type: array
   *                 items:
   *                   type: integer
   *     responses:
   *       200:
   *         description: Gắn thiết bị thành công
   */
  iotMap: async function (req, res, next) {
    try {
      const result = await studySpaceService.iotMap(req);
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
   * /study-space/devices:
   *   get:
   *     summary: Lấy danh sách thiết bị
   *     tags: [Study Space / Room Management]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Thành công
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
   *                   example: Lấy danh sách thiết bị thành công
   *                 data:
   *                   type: object
   *                   properties:
   *                     deviceList:
   *                       type: array
   *                       items:
   *                         $ref: '#/components/schemas/Device'
   */
  findAllDevices: async function (req, res, next) {
    try {
      const result = await studySpaceService.findAllDevices(req);
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
   * /study-space/{id}/qr:
   *   get:
   *     summary: Tạo hoặc lấy mã QR cho phòng học
   *     tags: [Study Space / Room Management]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Thành công
   *       404:
   *         description: Không tìm thấy phòng
   */
  qr: async function (req, res, next) {
    try {
      const result = await studySpaceService.qr(req);
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
   * /study-space:
   *   get:
   *     summary: Lấy danh sách tất cả phòng học
   *     tags: [Study Space / Room Management]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lấy danh sách phòng học thành công
   */
  findAll: async function (req, res, next) {
    try {
      const result = await studySpaceService.findAll(req);
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
   * /study-space/{id}:
   *   get:
   *     summary: Lấy thông tin chi tiết một phòng học
   *     tags: [Study Space / Room Management]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Thành công
   *       404:
   *         description: Không tìm thấy
   */
  findOne: async function (req, res, next) {
    try {
      const result = await studySpaceService.findOne(req);
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
   * /study-space/{id}/upload:
   *   post:
   *     summary: Upload hình ảnh cho phòng học
   *     tags: [Study Space / Room Management]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID của phòng học
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               images:
   *                 type: array
   *                 items:
   *                   type: string
   *                   format: binary
   *     responses:
   *       200:
   *         description: Upload ảnh thành công
   */
  update: async function (req, res, next) {
    try {
      const result = await studySpaceService.update(req);
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
   * /study-space/{id}/status:
   *   patch:
   *     summary: Cập nhật trạng thái phòng học
   *     tags: [Study Space / Room Management]
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
   *               status:
   *                 type: string
   *                 enum: [Available, InUse, Maintenance]
   *     responses:
   *       200:
   *         description: Thành công
   */
  updateStatus: async function (req, res, next) {
    try {
      const result = await studySpaceService.updateStatus(req);
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
   * /study-space/{id}:
   *   delete:
   *     summary: Xóa phòng học
   *     tags: [Study Space / Room Management]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Xóa thành công
   *       409:
   *         description: Phòng có lịch đặt trong tương lai
   */
  remove: async function (req, res, next) {
    try {
      const result = await studySpaceService.remove(req);
      const response = handleSuccessResponse(
        `Remove entity #${req.params.id} successfully`,
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
   * /study-space/{roomId}/delete-img/{imageId}:
   *   delete:
   *     summary: Xóa ảnh của phòng học
   *     tags: [Study Space / Room Management]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: roomId
   *         required: true
   *         schema:
   *           type: integer
   *       - in: path
   *         name: imageId
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Xóa thành công
   *       404:
   *         description: Không tìm thấy ảnh
   */
  deleteRoomImage: async function (req, res, next) {
    try {
      const result = await studySpaceService.deleteRoomImage(req);
      const response = handleSuccessResponse(
        `Remove entity #${req.params.imageId} successfully`,
        200,
        result,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
