import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/config.constant.js";

const tokenService = (nguoi_dung) => {
  const accessToken = jwt.sign(
    { nguoi_dung_id: nguoi_dung.nguoi_dung_id },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRE,
    },
  ); // => nhiệm vụ : prove nguoi_dung đã logged in

  //refresh => thời hạn lâu hơn tk accessToken ,
  const refreshToken = jwt.sign(
    { nguoi_dung_id: nguoi_dung.nguoi_dung_id },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRE,
    },
  ); // => nhiệm vụ : prove nguoi_dung đã logged in
  return {
    nguoi_dung_id: nguoi_dung.nguoi_dung_id,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export default tokenService;
