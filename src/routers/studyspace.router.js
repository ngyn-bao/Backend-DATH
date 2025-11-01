import express from "express";
import { studySpaceController } from "../controllers/studyspace.controller.js";
import protect from "../common/middleware/protect.middleware.js";

const studySpaceRouter = express.Router();

// Tạo route CRUD
studySpaceRouter.post("/", protect, studySpaceController.create);
studySpaceRouter.post("/:id/upload", protect, studySpaceController.upload);
studySpaceRouter.post("/:id/iot-map", protect, studySpaceController.iotMap);
studySpaceRouter.get("/:id/qr", protect, studySpaceController.qr);
studySpaceRouter.get("/", protect, studySpaceController.findAll);
studySpaceRouter.get("/devices", protect, studySpaceController.findAllDevices);
studySpaceRouter.get("/:id", protect, studySpaceController.findOne);
studySpaceRouter.put("/:id", protect, studySpaceController.update);
studySpaceRouter.patch(
  "/:id/status",
  protect,
  studySpaceController.updateStatus,
);
studySpaceRouter.delete("/:id", protect, studySpaceController.remove);
studySpaceRouter.delete(
  "/:roomId/images/:imageId",
  protect,
  studySpaceController.deleteRoomImage,
);

export default studySpaceRouter;
