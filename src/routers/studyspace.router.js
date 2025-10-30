import express from "express";
import { studySpaceController } from "../controllers/studyspace.controller.js";

const studySpaceRouter = express.Router();

// Tạo route CRUD
studySpaceRouter.post("/", studySpaceController.create);
studySpaceRouter.post("/:id/upload", studySpaceController.upload);
studySpaceRouter.post("/:id/iot-map", studySpaceController.iotMap);
studySpaceRouter.post("/:id/qr", studySpaceController.qr);
studySpaceRouter.get("/", studySpaceController.findAll);
studySpaceRouter.get("/:id", studySpaceController.findOne);
studySpaceRouter.put("/:id", studySpaceController.update);
studySpaceRouter.patch("/:id/status", studySpaceController.updateStatus);
studySpaceRouter.delete("/:id", studySpaceController.remove);
studySpaceRouter.delete(
  "/:roomId/images/:imageId",
  studySpaceController.deleteRoomImage,
);

export default studySpaceRouter;
