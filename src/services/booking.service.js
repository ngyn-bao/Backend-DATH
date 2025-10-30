import prisma from "../common/prisma/prisma.init.js";
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

    await prisma.room.update({
      where: { ID: +room_id },
      data: { status: "InUse" },
    });

    return { booking };
  },

  findAll: async function (req) {
    return `This action returns all entity`;
  },

  findOne: async function (req) {
    return `This action returns a entity with id: ${req.params.id}`;
  },

  update: async function (req) {
    return `This action updates a entity with id: ${req.params.id}`;
  },

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
