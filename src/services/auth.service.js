import prisma from "../common/prisma/prisma.init.js";
import bcrypt from "bcrypt";
import tokenService from "./token.service.js";
import { BadRequestError } from "../helpers/handleError.js";

export const authService = {
  register: async function (req) {
    const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
    if (!email || !mat_khau || !ho_ten) {
      throw new BadRequestError("Dữ liệu truyền vào không hợp lệ");
    }
    //b2: so sánh dữ liệu gửi đến có trong db hay không

    // select * from user where email like email;
    const userExist = await prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
    });
    if (userExist) {
      throw new BadRequestError("Đã tồn tại user này");
      //b3: chưa tồn tại => tạo mới user đó
    } else {
      const hashedPassword = await bcrypt.hash(mat_khau, 10);
      const newUser = await prisma.nguoi_dung.create({
        data: {
          email: email,
          mat_khau: hashedPassword,
          ho_ten: ho_ten,
          tuoi: tuoi,
          anh_dai_dien: anh_dai_dien,
        },
      });
      console.log(email);
      //   newUser.mat_khau = "12345";
      // sendMail(email, "Bạn có khỏe không");
      return newUser;
    }
  },

  login: async (req) => {
    //b1: nhận dữ liệu từ FE (body gửi lên);
    let { email, mat_khau } = req.body;
    console.log(email, mat_khau);

    // b2: kiểm tra email có trong hệ thống hay không? 2 TH
    const userExist = await prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
      select: {
        mat_khau: true,
        email: true,
        nguoi_dung_id: true,
      },
    });
    //kĩ thuật ngắt dòng
    if (!userExist) {
      throw new BadRequestError(
        "Không tìm thấy tài khoản, vui lòng đăng kí nhé!",
      );
    }
    //bước 3 kiểm tra password;
    const isValidPassword = bcrypt.compareSync(mat_khau, userExist.mat_khau);
    if (!isValidPassword) {
      throw new BadRequestError("Sai mật khẩu rồi bạn eei!");
    }
    //bước 4: tạo token với jwt //accessToken và refreshToken
    const tokens = tokenService(userExist);
    return tokens;
  },
};
