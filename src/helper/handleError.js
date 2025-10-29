// import pkg from "jsonwebtoken";
// const { TokenExpiredError, JsonWebTokenError } = pkg;
import { handleErrorResponse } from "./HandleResponse.js";

export const ErrorHandler = (err, req, res, next) => {
  // const resErorr = {
  //     message: err.message,
  //     code: err.code,
  //     stack: err.stack,
  // };
  console.log(err);

  // if (err instanceof JsonWebTokenError) {
  //     err.code = 401;
  // }

  // if (err instanceof TokenExpiredError) {
  //     err.code = 403;
  // }

  const resError = handleErrorResponse(err.message, err.code, err.stack);
  res.status(resError.code).json(resError);
};

export class BadRequestError extends Error {
  constructor(message = "BadRequestError") {
    super(message);
    this.code = 400;
  }
}

export class ForbiddenError extends Error {
  constructor(message = "ForbiddenError") {
    super(message);
    this.code = 403;
  }
}

// export class ForbiddenError extends Error {
//     constructor(message = "ForbiddenError") {
//         super(message);
//         this.code = 403;
//     }
// }

//400, 401, 403,
export class UnAuthorizedError extends Error {
  constructor(message = "UnAuthorizedError") {
    super(message);
    this.code = 401;
  }
}
