import prisma from "../common/prisma/prisma.init.js";
import bcrypt from "bcrypt";
import tokenService from "./token.service.js";
import { BadRequestError, NotFoundError } from "../helpers/handleError.js";

export const authService = {
  register: async function (req) {
    const { email, password, fullname, phone_num } = req.body;
    if (!email || !password || !fullname) {
      throw new BadRequestError("Dữ liệu truyền vào không hợp lệ");
    }
    //b2: so sánh dữ liệu gửi đến có trong db hay không

    // select * from user where email like email;
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExist) {
      throw new BadRequestError("Đã tồn tại user này");
      //b3: chưa tồn tại => tạo mới user đó
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          fullname: fullname,
          role_id: 1,
          phone_num: phone_num,
        },
        select: {
          ID: true,
          full_name: true,
          email: true,
          phone_num: true,
          status: true,
          role: { select: { role_name: true } },
        },
      });
      // console.log(email);
      //   newUser.mat_khau = "12345";
      // sendMail(email, "Bạn có khỏe không");
      return { newUser };
    }
  },

  login: async (req) => {
    //b1: nhận dữ liệu từ FE (body gửi lên);
    let { email, password } = req.body;
    // console.log(email, password);

    // b2: kiểm tra email có trong hệ thống hay không? 2 TH
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        password: true,
        email: true,
        ID: true,
      },
    });
    //kĩ thuật ngắt dòng
    if (!userExist) {
      throw new NotFoundError(
        "Không tìm thấy tài khoản, vui lòng đăng kí nhé!",
      );
    }
    //bước 3 kiểm tra password;
    const isValidPassword = bcrypt.compareSync(password, userExist.password);
    if (!isValidPassword) {
      throw new BadRequestError("Sai mật khẩu!");
    }
    //bước 4: tạo token với jwt //accessToken và refreshToken
    const tokens = tokenService(userExist);
    return tokens;
  },
};
