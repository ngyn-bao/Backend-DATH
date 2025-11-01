import prisma from "../common/prisma/prisma.init.js";
import sqlDateFormat from "../common/utils/formatDate.js";
import { BadRequestError, NotFoundError } from "../helpers/handleError.js";

export const bookingService = {
  create: async function (req) {
    const { room_id, booking_user, start_time, end_time } = req.body;

    const room = await prisma.room.findUnique({ where: { ID: +room_id } });

    if (!room) throw new NotFoundError("Không tìm thấy phòng");

    const overlap = await prisma.booking.findFirst({
      where: {
        room_id: +room_id,
        status: { not: "Cancelled" },
        OR: [
          {
            start_time: { lte: new Date(end_time) },
            end_time: { gte: new Date(start_time) },
          },
        ],
      },
    });

    if (overlap)
      throw new BadRequestError("Phòng đã được đặt trong khoảng thời gian này");

    const booking = await prisma.booking.create({
      data: {
        room_id: +room_id,
        booking_user: +booking_user,
        start_time: new Date(start_time),
        end_time: new Date(end_time),
        status: "Booked",
      },
      include: { room: true },
    });

    // await prisma.room.update({
    //   where: { ID: +room_id },
    //   data: { status: "InUse" },
    // });

    return { booking };
  },

  findAll: async function (req) {
    const bookingList = await prisma.booking.findMany();

    return { bookingList: bookingList.length === 0 ? [] : bookingList };
  },

  findOne: async function (req) {
    const bookingId = req.params.id;

    if (!bookingId) throw new BadRequestError("Vui lòng nhập ID booking");

    const foundBooking = await prisma.booking.findUnique({
      where: { ID: +bookingId },
    });

    if (!foundBooking) throw new NotFoundError("Không tìm thấy booking");

    return { foundBooking };
  },

  // update: async function (req) {
  //   const { bookingId } = req.params.id;

  //   if (!bookingId) throw new BadRequestError("Vui lòng nhập ID booking");

  //   const foundBooking = await prisma.booking.findUnique({
  //     where: { ID: +bookingId },
  //   });

  //   if (!foundBooking) throw new NotFoundError("Không tìm thấy booking");
  // },

  remove: async function (req) {
    const bookingId = req.params.id;

    if (!bookingId) throw new BadRequestError("Vui lòng nhập ID");

    const booking = await prisma.booking.findUnique({
      where: { ID: +bookingId },
    });

    if (!booking) throw new NotFoundError("Không tìm thấy lịch đặt");

    const deletedBooking = await prisma.booking.update({
      where: { ID: +bookingId },
      data: { status: "Cancelled", cancel_reason: "User cancelled manually" },
    });

    await prisma.room.update({
      where: { ID: +bookingId },
      data: { status: "Available" },
    });

    return { deletedBooking };
  },
};
