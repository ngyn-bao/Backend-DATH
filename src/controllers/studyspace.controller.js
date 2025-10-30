import { handleSuccessResponse } from "../helpers/handleResponse.js";
import { studySpaceService } from "../services/studyspace.service.js";

export const studySpaceController = {
  create: async function (req, res, next) {
    try {
      const result = await studySpaceService.create(req);
      const response = responseSuccess(result, `Create entity successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  upload: async function (req, res, next) {
    try {
      const result = await studySpaceService.upload(req);
      const response = responseSuccess(result, `Create entity successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  iotMap: async function (req, res, next) {
    try {
      const result = await studySpaceService.iotMap(req);
      const response = responseSuccess(result, `Create entity successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  qr: async function (req, res, next) {
    try {
      const result = await studySpaceService.iotMap(req);
      const response = responseSuccess(result, `Create entity successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

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

  findOne: async function (req, res, next) {
    try {
      const result = await studySpaceService.findOne(req);
      const response = responseSuccess(
        result,
        `Get entity #${req.params.id} successfully`,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await studySpaceService.update(req);
      const response = responseSuccess(
        result,
        `Update entity #${req.params.id} successfully`,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateStatus: async function (req, res, next) {
    try {
      const result = await studySpaceService.updateStatus(req);
      const response = responseSuccess(
        result,
        `Update entity #${req.params.id} successfully`,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await studySpaceService.remove(req);
      const response = responseSuccess(
        result,
        `Remove entity #${req.params.id} successfully`,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  deleteRoomImage: async function (req, res, next) {
    try {
      const result = await studySpaceService.deleteRoomImage(req);
      const response = responseSuccess(
        result,
        `Remove entity #${req.params.imageId} successfully`,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
