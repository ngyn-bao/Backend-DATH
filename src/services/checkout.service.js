import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const checkoutService = {
  checkout: async function (req) {
    // const roomID = req.params.id;
    // if (!roomID) throw new BadRequestError("Vui lòng nhập id phòng");

    // await prisma.room.update({
    //   data: {
    //     status: "Available",
    //   },
    //   where: {
    //     ID: +roomID,
    //   },
    // });

    // await prisma.booking.update({
    //   data: {
    //     checkout_time: new Date(Date.now()),
    //   },
    //   where: {
    //     ID: booking.,
    //   },
    // });
    const bookingId = req.params.id;
    if (!bookingId) throw new BadRequestError("Vui lòng nhập ID booking");

    const booking = await prisma.booking.findUnique({
      where: { ID: +bookingId },
    });
    if (!booking) throw new NotFoundError("Không tìm thấy booking");

    const room = await prisma.room.findUnique({
      where: { ID: booking.room_id },
    });
    if (!room) throw new NotFoundError("Không tìm thấy phòng");

    // Checkout → set trạng thái phòng về "Available"
    await prisma.room.update({
      where: { ID: room.ID },
      data: { status: "Available" },
    });

    const updatedBooking = await prisma.booking.update({
      where: { ID: booking.ID },
      data: { checkout_time: new Date() },
    });

    return { updatedBooking };
  },
};
