import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constant/config.constant.js";
import prisma from "../prisma/prisma.init.js";
import { NotFoundError, UnAuthorizedError } from "../../helpers/handleError.js";
// const protect = async (req, res, next) => {
//     try {
//         console.log("kiểm tra TOKEN");

//         console.log(req.headers);
//         const accessToken = req.headers?.authorization?.split(" ")[1];
//         // console.log(accessToken);
//         if (!accessToken) {
//             throw new UnAuthorizedError("Cần cung cấp access token");
//         }

//         const verifyToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
//         // if (!verifyToken) {
//         //     throw new ForbiddenError("Token hết hạn");
//         // }
//         console.log(verifyToken);

//         const user = await prisma.users.findUnique({
//             where: {
//                 user_id: verifyToken.user_id,
//             },
//         });
//         if (!user) {
//             throw new ForbiddenError("Không tìm thấy user đó");
//         }
//         req.user = user;

//         next();
//     } catch (error) {
//         next(error);
//     }
// };

// export default protect;

const protect = async (req, res, next) => {
  try {
    // console.log("Kiểm tra token");
    const accessToken = req.headers?.authorization?.split(" ")[1];
    if (!accessToken) {
      throw new UnAuthorizedError("Vui lòng cung cấp token để sử dụng api này");
    }
    // console.log(accessToken);
    const verifyToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    //nếu lỗi jwt sẽ tự động bắn lỗi
    // console.log({ verifyToken });

    const user = await prisma.user.findUnique({
      where: {
        ID: verifyToken.user_id,
      },
      select: {
        ID: true,
        full_name: true,
        email: true,
        last_login: true,
        role_id: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundError("Không tìm thấy user");
    }

    req.user = user;

    //console.log(req.headers.authorization.split(" ")[1]);
    next();
  } catch (error) {
    next(error);
  }
};
export default protect;
