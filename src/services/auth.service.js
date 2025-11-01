import prisma from "../common/prisma/prisma.init.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import tokenService from "./token.service.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../helpers/handleError.js";

import {
  REFRESH_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/config.constant.js";

export const authService = {
  register: async function (req) {
    const allowedRoleId = ["1", "2"];
    const { email, password, full_name, phone_num, role_id } = req.body;
    console.log(req.body);
    if (!email || !password || !full_name || !allowedRoleId.includes(role_id)) {
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
          full_name: full_name,
          role_id: +role_id,
          phone_num: phone_num,
          status: "Available",
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
      return { newUser };
    }
  },

  login: async (req, res) => {
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
        role: { select: { role_name: true } },
      },
    });
    console.log(userExist);
    
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

    await prisma.user.update({
      where: { ID: userExist.ID },
      data: { last_login: new Date() },
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true, // true nếu dùng HTTPS
      sameSite: "strict", // chống CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày = 7*24*60*60*1000 ms
    });
    return { ID: tokens.ID, accessToken: tokens.accessToken, role: tokens.role_name};
  },

  deleteToken: async (req, res) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return { message: "Đã logout thành công" };
  },

  refreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new UnAuthorizedError("Không có refresh token");

    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: { ID: payload.ID },
      select: { ID: true, email: true, role: { select: { role_name: true } } },
    });
    if (!user) return res.status(401).json({ message: "User không tồn tại" });

    const tokens = tokenService(user);

    // Cập nhật refresh token mới
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { ID: tokens.ID, accessToken: tokens.accessToken , role: tokens.role_name};
  },
};
