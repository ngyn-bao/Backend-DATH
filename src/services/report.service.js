import cloudinary from "../common/cloudinary/cloudinary.config.js";
import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const reportService = {
  getUsageReport: async function (req) {
	const {
		periodStart,
		periodEnd,
		id
	} = req.body;

	if (capacity < 0) {
		throw new BadRequestError("Sức chứa không hợp lệ (phải >= 0)");
	}

	if(!periodStart)
	{
		periodStart = new Date(0);
	}

	if(!periodEnd)
	{
		periodEnd = Date.now();
	}

	const bookings = await prisma.$queryRaw'SELECT * FROM booking WHERE created_date >= ${periodStart} AND created_at <= ${periodEnd} AND booking_user = ${id}';
	const penalties = await prisma.$queryRaw'SELECT * FROM penalty WHERE user_id = ${id}';

	let timeUsageByHours = 0;
	let noCheckinCount = 0;
	let freq = [];

	for (booking in bookings)
	{
		if(booking.checkin_time)
		{
			timeUsageByHours += (booking.checkout_time - booking.checkin_time).getHours();
		}
		else
		{
			noCheckinCount++;
		}

		let startHours = booking.start_time.getHours();
		let endHours = booking.end_time.getHours();

		for(let j = startHours; j < endHours; ++j)
		{
			freq[j]++;
		}
	}

	const peakHours = Math.max(freq);
	const bookingCount = bookings.size;
	const violationByUser = penalties.size;
	const violationByGroupUser = 0;
	const roomUsageRate = 1;

	const createdDate = Date.now();

	const newReport = await prisma.usage_report.create({
		data: {
			createdDate,
			periodStart,
			periodEnd,
			timeUsageByHours,
			violationByUser,
			violationByGroupUser,
			noCheckinCount,
			bookingCount,
			roomusageRate,
			peakHours,
			id
		},
		include: { user: true },
	});

	return { newReport };
	},


};
