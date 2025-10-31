import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/config.constant.js";

const tokenService = (user) => {
  const accessToken = jwt.sign({ user_id: user.user_id }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  }); // => nhiệm vụ : prove user đã logged in

  //refresh => thời hạn lâu hơn tk accessToken ,
  const refreshToken = jwt.sign(
    { user_id: user.user_id },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRE,
    },
  ); // => nhiệm vụ : prove user đã logged in
  return {
    user_id: user.user_id,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export default tokenService;
