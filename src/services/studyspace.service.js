import cloudinary from "../common/cloudinary/cloudinary.config.js";
import prisma from "../common/prisma/prisma.init.js";
import QRCode from "qrcode";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const studySpaceService = {
  create: async function (req) {
    const {
      name,
      building,
      status,
      capacity,
      type,
      description,
      manager_id,
      devices,
    } = req.body;

    if (capacity < 0) {
      throw new BadRequestError("Sức chứa không hợp lệ (phải >= 0)");
    }

    const newRoom = await prisma.room.create({
      data: {
        name,
        building,
        status,
        capacity: +capacity,
        type,
        description,
        manager_id: manager_id ? +manager_id : null,
        device:
          devices && devices.length > 0
            ? {
                create: devices.map((d) => ({
                  name: d.name,
                  type: d.type,
                  description: d.description,
                  energy_consumption: d.energy_consumption ?? null,
                })),
              }
            : undefined,
      },
      include: { device: true },
    });

    return { newRoom };
  },

  upload: async function (req) {
    const roomId = req.params.id;

    if (!roomId) throw new BadRequestError("Vui lòng nhập id phòng");
    if (!req.files || !req.files.images)
      throw new BadRequestError("Vui lòng chọn ít nhất 1 ảnh");

    const image = Array.isArray(req.files.images)
      ? req.files.images
      : [req.files.images];

    const uploadResult = [];

    for (const img of image) {
      const result = await cloudinary.uploader.upload(img.tempFilePath, {
        folder: "DATH/rooms",
        transformation: [{ width: 1024, height: 768, crop: "limit" }],
      });

      uploadResult.push({
        url: result.secure_url,
        public_id: result.public_id,
      });

      await prisma.room_image.create({
        data: {
          room_id: +roomId,
          image_url: result.secure_url,
          cloudinary_id: result.public_id,
        },
      });
    }

    const savedImages = await prisma.room_image.findMany({
      where: { room_id: +roomId },
    });

    return { images: savedImages };
  },

  iotMap: async function (req) {
    const roomId = req.params.id;
    const { deviceIds } = req.body;

    if (!roomId) throw new BadRequestError("Vui lòng nhập id phòng");

    const device = await prisma.device.findFirst({
      where: { room_id: roomId },
    });

    const mappedDevice = await prisma.device.updateMany({
      where: { ID: { in: deviceIds } },
      data: { room_id: +roomId },
    });

    return { mappedDevice };
  },

  qr: async function (req) {
    const roomId = req.params.id;

    if (!roomId) throw new BadRequestError("Vui lòng nhập id phòng");

    const room = await prisma.room.findUnique({ where: { ID: +roomId } });
    if (!room) throw new NotFoundError("Không tìm thấy phòng");

    const existingQR = await prisma.room_qr.findUnique({
      where: { room_id: +roomId },
    });

    if (existingQR) {
      return {
        qr_path: existingQR.qr_path,
      };
    }

    const qrData = {
      id: room.ID,
      name: room.name,
      building: room.building,
      capacity: room.capacity,
    };

    const qrBuffer = await QRCode.toBuffer(JSON.stringify(qrData));

    const uploadResPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "DATH/qrcodes",
          unique_filename: true,
        },
        async (err, result) => {
          if (err) return reject(err);

          const savedQR = await prisma.room_qr.create({
            data: {
              room_id: +roomId,
              qr_path: result.secure_url,
              generated_at: new Date(),
            },
          });

          resolve(savedQR);
        },
      );

      uploadStream.end(qrBuffer);
    });

    const uploadRes = await uploadResPromise;

    return {
      qr_path: uploadRes.qr_path,
    };
  },

  findAll: async function (req) {
    const roomList = await prisma.room.findMany({
      include: { device: true },
      orderBy: { building: "asc" },
    });

    // if (roomList.length === 0)
    //   throw new NotFoundError("Không có phòng khả dụng!");

    return { roomList: roomList.length == 0 ? roomList : [] };
  },

  findOne: async function (req) {
    const roomId = req.params.id;

    if (!roomId) throw new BadRequestError("Vui lòng nhập id phòng");

    const foundRoom = await prisma.room.findFirst({
      where: { ID: +roomId },
      include: { device: true },
    });

    if (!foundRoom) throw new NotFoundError("Không tìm thấy phòng!");

    return { foundRoom: foundRoom };
  },

  update: async function (req) {
    const roomId = req.params.id;
    const { name, building, capacity, type, description, manager_id } =
      req.body;

    if (!roomId) throw new BadRequestError("Vui lòng nhập id phòng");

    if (capacity < 0) {
      throw new BadRequestError("Sức chứa không hợp lệ (phải >= 0)");
    }

    const updatedRoom = await prisma.room.update({
      where: { ID: +roomId },
      data: {
        name,
        building,
        capacity: +capacity,
        type,
        description,
        manager_id: manager_id ? +manager_id : null,
      },
    });

    return { updatedRoom };
  },

  updateStatus: async function (req) {
    const roomId = req.params.id;
    const { status } = req.body;

    const validStatus = ["Available", "InUse", "Maintenance"];
    if (!roomId) throw new BadRequestError("Vui lòng nhập id phòng");

    if (!validStatus.includes(status)) {
      throw new BadRequestError("Trạng thái không hợp lệ");
    }

    const updatedRoom = await prisma.room.update({
      where: { ID: +roomId },
      data: {
        status,
      },
    });

    return { updatedRoom };
  },

  remove: async function (req) {
    const roomId = req.params.id;
    if (!roomId) throw new BadRequestError("Vui lòng nhập id phòng");

    const futureRoom = await prisma.booking.findMany({
      where: { room_id: +roomId, start_time: { gt: new Date() } },
    });

    if (futureRoom.length > 0) {
      throw new ConflictError(
        "Phòng có lịch đặt trong tương lai, không thể xóa. Gợi ý: Chuyển trạng thái 'Bảo trì'.",
      );
    }

    const deletedRoom = await prisma.room.delete({ where: { ID: +roomId } });

    return { deletedRoom };
  },

  deleteRoomImage: async function (req) {
    const { roomId, imageId } = req.params;

    const images = await prisma.room_image.findFirst({
      where: { id: +imageId, room_id: +roomId },
    });

    if (!images) throw new NotFoundError("Không tìm thấy ảnh");

    await Promise.all(
      images.map((img) => cloudinary.uploader.destroy(img.cloudinary_id)),
    );

    deletedImages = await prisma.room_image.deleteMany({
      where: { room_id: roomId },
    });

    return { deletedImages };
  },
};
