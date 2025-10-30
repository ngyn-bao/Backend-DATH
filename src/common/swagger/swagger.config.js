import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ĐATH API",
      version: "1.0.0",
      description: "Backend",
    },
    servers: [
      {
        url: "http://localhost:3069",
      },
      // {
      //   url: "http://13.250.115.109:3069",
      // },
    ],
    tags: [
      {
        name: "Study Space / Room Management",
        description: "Quản lý phòng học, hình ảnh, IoT và QR Code",
      },
      { name: "Suất chiếu", description: "Các API liên quan đến suất chiếu" },
      {
        name: "Auth",
        description: "Các API liên quan tới đăng ký / đăng nhập",
      },
      {
        name: "Khách hàng",
        description: "Các API liên quan tới khách hàng",
      },
      { name: "Chi nhánh", description: "Các API liên quan tới chi nhánh" },
      { name: "Nhân viên", description: "Các API liên quan tới nhân viên" },
    ],
  },
  apis: ["./src/routers/*.js", "./src/controllers/*.js"], // nơi chứa comment @swagger
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
  app.use("/swagger/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
