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
        name: "Auth",
        description: "Đăng ký / Đăng nhập",
      },
      {
        name: "Study Space / Room Management",
        description: "Quản lý phòng học, hình ảnh, IoT và QR Code",
      },
      {
        name: "Booking",
        description: "Quản lý đặt phòng học (Booking Study Space)",
      },
    ],
  },
  apis: ["./src/routers/*.js", "./src/controllers/*.js"], // nơi chứa comment @swagger
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
  app.use("/swagger/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
