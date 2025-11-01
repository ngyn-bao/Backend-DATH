import cloudinary from "../common/cloudinary/cloudinary.config.js";
import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

import { indexOfMax } from "../helpers/utils.js";

export const reportService = {
  createUsageReport: async function (req) {
    let { periodStart, periodEnd } = req.body;
    const { id } = req.body;

    const foundUser = await prisma.user.findUnique({ where: { ID: +id } });

    if (!foundUser) throw new NotFoundError("Không tìm thấy người dùng");

    if (!periodStart) {
      periodStart = new Date(0);
    } else {
      periodStart = new Date(periodStart);
    }

    if (!periodEnd) {
      periodEnd = Date.now();
    } else {
      periodEnd = new Date(periodEnd);
    }

    const bookings = await prisma.booking.findMany({
      where: {
        created_at: {
          gte: periodStart,
          lte: periodEnd,
        },
        booking_user: id,
      },
    });
    const penalties = await prisma.penalty.findMany({
      where: {
        user_id: id,
      },
    });

    let timeUsageByHours = 0;
    let noCheckinCount = 0;
    let freq = [];

    for (let index = 0; index < 24; ++index) {
      freq[index] = 0;
    }

    for (let index = 0; index < bookings.length; ++index) {
      const booking = bookings[index];

      if (booking.checkin_time != null) {
        timeUsageByHours += (
          booking.checkout_time - booking.checkin_time
        ).getHours();
      } else {
        noCheckinCount++;
      }

      let startHours = booking.start_time.getUTCHours();
      let endHours = booking.end_time.getUTCHours();

      for (let j = startHours; j < endHours; ++j) {
        freq[j]++;
      }
    }
    const peakHours = indexOfMax(freq);
    let peakHoursString = "";

    for (let i = 0; i < peakHours.length; ++i) {
      peakHoursString += peakHours[i].toString();

      if (i != peakHours.length - 1) peakHoursString += ",";
    }

    const bookingCount = penalties.size != null ? penaltiez.size : 0;
    const violationByUser = penalties.size != null ? penalties.size : 0;
    const violationByGroupUser = 0;
    const roomUsageRate = 1;

    const newReport = await prisma.usage_report.create({
      data: {
        period_start: periodStart,
        period_end: periodEnd,
        time_usage_by_hours: timeUsageByHours,
        violation_by_user: violationByUser,
        violation_by_group_user: violationByGroupUser,
        no_checkin_count: noCheckinCount,
        booking_count: bookingCount,
        room_usage_rate: roomUsageRate,
        peak_hours: peakHoursString,
        generate_by: id,
      },
      include: {
        user: {
          select: {
            ID: true,
            full_name: true,
            email: true,
            phone_num: true,
            status: true,
            role: { select: { role_name: true } },
          },
        },
      },
    });

    return { newReport };
  },

  createEnergyReport: async function (req) {
    let { periodStart, periodEnd } = req.body;
    const { id } = req.body;

    const foundUser = await prisma.user.findUnique({ where: { ID: +id } });

    if (!foundUser) throw new NotFoundError("Không tìm thấy người dùng");

    const energyRate = 145; //tobechanged

    if (!periodStart) {
      periodStart = new Date(0);
    } else {
      periodStart = new Date(periodStart);
    }

    if (!periodEnd) {
      periodEnd = Date.now();
    } else {
      periodEnd = new Date(periodEnd);
    }

    const bookings = await prisma.booking.findMany({
      where: {
        created_at: {
          gte: periodStart,
          lte: periodEnd,
        },
        booking_user: id,
      },
    });

    let totalEnergyConsumption = 0;
    let iotDevicePerformance = "";

    for (let booking in bookings) {
      if (booking.checkout_time == null) continue;
      const room = await prisma.room.findUnique({
        where: {
          ID: booking.room_id,
        },
      });

      if (!room) throw new NotFoundError("Không tìm thấy phòng");

      const devices = await prisma.device.findMany({
        where: {
          room_id: booking.room_id,
        },
      });

      const timeUsed = booking.checkout_time - booking.checkin_time;
      for (let device in devices) {
        totalEnergyConsumption += device.energy_consumption * timeUsed;
      }
    }

    if (totalEnergyConsumption > 10000) {
      iotDevicePerformance = "Bad";
    } else if (totalEnergyConsumption > 5000) {
      iotDevicePerformance = "Average";
    } else {
      iotDevicePerformance = "Good";
    }

    const costForecast = totalEnergyConsumption * energyRate;
    const newReport = await prisma.energy_report.create({
      data: {
        period_start: periodStart,
        period_end: periodEnd,
        total_energy_consumption: totalEnergyConsumption,
        iot_device_performance: iotDevicePerformance,
        cost_forecast: costForecast,
        generate_by: id,
      },
      include: {
        user: {
          select: {
            ID: true,
            full_name: true,
            email: true,
            phone_num: true,
            status: true,
            role: { select: { role_name: true } },
          },
        },
      },
    });

    return { newReport };
  },
  getUsageReport: async function (req) {
    const reportID = req.params.id;

    const report = prisma.usage_report.findUnique({
      where: {
        ID: reportID,
      },
    });

    return { report };
  },
  getEnergyReport: async function (req) {
    const reportID = req.params.id;

    const report = prisma.energy_report.findUnique({
      where: {
        ID: reportID,
      },
    });

    return { report };
  },
};
