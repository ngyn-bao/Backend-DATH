import cloudinary from "../common/cloudinary/cloudinary.config.js";
import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const checkinService = {
  checkin: async function (req) {
    // const roomID = req.params.id;
    // if (!roomID) throw new BadRequestError("Vui lòng nhập id phòng");

    // const room = await prisma.room.findUnique({ where: { ID: +roomID } });

    // if (!room) throw new NotFoundError("Không tìm thấy phòng");

    // await prisma.room.update({
    //   data: {
    //     status: "occupied",
    //   },
    //   where: {
    //     ID: parseInt(roomID, 10),
    //   },
    // });

    // const updatedBooking = await prisma.booking.update({
    //   data: {
    //     checkin_time: new Date(Date.now()),
    //   },
    //   where: {
    //     ID: parseInt(roomID, 10),
    //   },
    // });

    // return { updatedBooking };
    const bookingId = req.params.id;
    if (!bookingId) throw new BadRequestError("Vui lòng nhập ID booking");

    // Lấy booking
    const booking = await prisma.booking.findUnique({
      where: { ID: +bookingId },
    });
    if (!booking) throw new NotFoundError("Không tìm thấy booking");

    // Lấy phòng liên quan
    const room = await prisma.room.findUnique({
      where: { ID: booking.room_id },
    });
    if (!room) throw new NotFoundError("Không tìm thấy phòng");

    // Cập nhật trạng thái phòng
    await prisma.room.update({
      where: { ID: room.ID },
      data: { status: "Occupied" },
    });

    // Cập nhật thời gian checkin cho booking
    const updatedBooking = await prisma.booking.update({
      where: { ID: booking.ID },
      data: { checkin_time: new Date() },
    });

    return { updatedBooking };
  },
};
