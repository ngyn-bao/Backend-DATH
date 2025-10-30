import { bookingService } from "../services/booking.service.js";

export const bookingController = {
  create: async function (req, res, next) {
    try {
      const result = await bookingService.create(req);
      const response = responseSuccess(result, `Create entity successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await bookingService.findAll(req);
      const response = responseSuccess(result, `Get all entity successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await bookingService.findOne(req);
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
      const result = await bookingService.update(req);
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
