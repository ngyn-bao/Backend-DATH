import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/config.constant.js";

const tokenService = (user) => {
  const accessToken = jwt.sign({ ID: user.ID }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  }); // => nhiệm vụ : prove user đã logged in

  //refresh => thời hạn lâu hơn tk accessToken ,
  const refreshToken = jwt.sign({ ID: user.ID }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRE,
  }); // => nhiệm vụ : prove user đã logged in
  return {
    ID: user.ID,
    accessToken: accessToken,
    refreshToken: refreshToken,
    role_name: user.role.role_name,
  };
};

export default tokenService;
