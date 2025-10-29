export const handleSuccessResponse = (
  message = "Success",
  code = 200,
  metaData = null
) => {
  return {
    status: `success`,
    message, //object literal
    code,
    metaData,
  };
};

export const handleErrorResponse = (
  message = "Internal Server Error",
  code = 500,
  stack = null
) => {
  return {
    message,
    code,
    stack,
  };
};
