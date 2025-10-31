import { ForbiddenError } from "../../helpers/handleError.js";
import prisma from "../prisma/prisma.init.js";

const checkPermission = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const { role_id } = req.user;

      const role = await prisma.role.findUnique({
        where: { ID: +role_id },
        select: { role_name: true },
      });

      if (!role)
        throw new ForbiddenError("Không xác định được vai trò người dùng");

      // Nếu là admin thì luôn được phép
      if (role.role_name === "Admin") return next();

      // Kiểm tra role hiện tại có nằm trong danh sách allowedRoles không
      if (!allowedRoles.includes(role.role_name)) {
        throw new ForbiddenError("Bạn không có quyền truy cập chức năng này");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default checkPermission;
