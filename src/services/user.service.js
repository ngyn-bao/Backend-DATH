import prisma from "../common/prisma/prisma.init.js";
import { BadRequestError, NotFoundError } from "../helpers/handleError.js";
import bcrypt from "bcrypt";

export const userService = {
  findOne: async function (req) {
    const userId = req.params.id;

    if (!userId) throw new BadRequestError("Vui lòng nhập id");

    const foundUser = prisma.user.findUnique({
      where: { ID: +userId },
      select: {
        ID: true,
        full_name: true,
        email: true,
        phone_num: true,
        status: true,
        created_date: true,
        manager_id: true,
        last_login: true,
      },
    });

    if (!foundUser) throw new NotFoundError("Không tìm thấy user");
    return { foundUser };
  },

  update: async function (req) {
    const userId = req.params.id;

    if (!userId) throw new BadRequestError("Vui lòng nhập id");

    const foundUser = prisma.user.findUnique({ where: { ID: +userId } });

    if (!foundUser) throw new NotFoundError("Không tìm thấy user");

    const { full_name, email, phone_num } = req.body;

    if (!full_name || !email || !phone_num)
      throw new BadRequestError("Lỗi yêu cầu");

    const user = prisma.user.update({
      where: { ID: +userId },
      data: { email: email, full_name: full_name, phone_num: phone_num },
      select: {
        ID: true,
        full_name: true,
        email: true,
        phone_num: true,
        status: true,
        created_date: true,
        manager_id: true,
        last_login: true,
      },
    });

    if (!user) throw new BadRequestError("Lỗi update user");

    return { updatedUser: user };
  },

  changePassword: async function (req) {
    const userId = req.params.id;

    if (!userId) throw new BadRequestError("Vui lòng nhập id");

    const foundUser = prisma.user.findUnique({ where: { ID: +userId } });

    if (!foundUser) throw new NotFoundError("Không tìm thấy user");

    const { password } = req.body;

    if (!password || password.length < 6) {
      throw new BadRequestError("Mật khẩu phải có ít nhất 6 ký tự");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { ID: +userId },
      data: { password: hashedPassword },
      select: {
        ID: true,
        full_name: true,
        email: true,
        phone_num: true,
        status: true,
        created_date: true,
        manager_id: true,
        last_login: true,
      },
    });

    if (!updatedUser) throw new BadRequestError("Lỗi update mật khẩu");

    return { updatedUser };
  },
};
