import { roomService } from "../services/roomService.js";
import { handleSuccessResponse } from ""

export const roomController = {
  getAll: async function (req, res, next) {
    try {
      const result = await likeService.getByUser(req);
      const response = handleSuccessResponse(
        `Lấy danh sách theo user thành công`,
        undefined,
        result
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
