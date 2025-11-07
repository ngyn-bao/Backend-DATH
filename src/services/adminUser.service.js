import prisma from "../common/prisma/prisma.init.js";
import { BadRequestError, NotFoundError } from "../helpers/handleError.js";
import bcrypt from "bcrypt";

export const adminUserService = {
  create: async function (req) {
    const { full_name, email, password, role_id, admin_id } = req.body;

    if (!full_name || !email || !password || !role_id)
      throw new BadRequestError("Thiếu dữ liệu tạo người dùng");

    // Kiểm tra trùng email
    const existed = await prisma.user.findUnique({ where: { email } });
    if (existed) throw new BadRequestError("Email đã được sử dụng");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        password: hashedPassword,
        role_id,
        status: "Active",
        created_date: new Date(),
      },
      select: {
        ID: true,
        full_name: true,
        email: true,
        status: true,
        created_date: true,
        role: { select: { role_name: true } },
        penalty_penalty_user_idTouser: {
          select: { ID: true, point: true, type: true, created_at: true },
        },
      },
    });

    // Ghi log thao tác admin
    const message = await prisma.manage_config.create({
      data: {
        action: "CREATE_USER",
        description: `Admin #${admin_id} tạo người dùng mới: ${email}`,
        admin_id,
      },
    });

    return { user, message };
  },

  findAll: async function (req) {
    const users = await prisma.user.findMany({
      select: {
        ID: true,
        full_name: true,
        email: true,
        status: true,
        created_date: true,
        role: { select: { role_name: true } },
        penalty_penalty_user_idTouser: {
          select: { ID: true, point: true, type: true, created_at: true },
        },
      },
    });
    return { users };
  },

  //   findOne: async function (req) {
  //     return `This action returns a entity with id: ${req.params.id}`;
  //   },

  update: async function (req) {
    const { status, admin_id, userId, role_id } = req.body;
    // const userId = +req.params.id;

    if (!userId) throw new BadRequestError("Vui lòng nhập ID user");

    const user = await prisma.user.findUnique({ where: { ID: +userId } });
    if (!user) throw new NotFoundError("Không tìm thấy người dùng");

    const updated = await prisma.user.update({
      where: { ID: +userId },
      data: { status, role_id },
    });

    const message = await prisma.manage_config.create({
      data: {
        action: "UPDATE_USER_STATUS",
        description: `Admin #${admin_id} đổi trạng thái người dùng #${userId} thành ${status}`,
        admin_id,
      },
    });

    return { updated, message };
  },

  resetPenalty: async function (req) {
    const { admin_id, userId } = req.body;

    const penalties = await prisma.penalty.findMany({
      where: { user_id: +userId },
    });

    if (penalties.length === 0)
      throw new NotFoundError("Người dùng không có vi phạm");

    await prisma.penalty.deleteMany({ where: { user_id: +userId } });

    const message = await prisma.manage_config.create({
      data: {
        action: "RESET_PENALTY",
        description: `Admin #${admin_id} reset vi phạm người dùng #${userId}`,
        admin_id,
      },
    });

    return { message };
  },

  remove: async function (req) {
    //   const userId = +req.params.id;
    const { admin_id, userId } = req.body;

    const user = await prisma.user.findUnique({ where: { ID: +userId } });
    if (!user) throw new NotFoundError("Không tìm thấy người dùng");

    await prisma.user.delete({ where: { ID: +userId } });

    const message = await prisma.manage_config.create({
      data: {
        action: "DELETE_USER",
        description: `Admin #${admin_id} xóa người dùng #${userId} (${user.email})`,
        admin_id,
      },
    });

    return { message };
  },
};
