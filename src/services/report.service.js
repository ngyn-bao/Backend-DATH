import cloudinary from "../common/cloudinary/cloudinary.config.js";
import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const reportService = {
	createUsageReport: async function (req) {
		const {
			periodStart,
			periodEnd,
			id
		} = req.body;

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
				peak_hours: peakHours,
				generated_by: id
			},
			include: { user: true },
		});

		return { newReport };
	},

	createEnergyReport: async function (req) {
		const {
			periodStart,
			periodEnd,
			id
		} = req.body;

		const energyRate = 145; //tobechanged

		if(!periodStart)
		{
			periodStart = new Date(0);
		}

		if(!periodEnd)
		{
			periodEnd = Date.now();
		}

		const bookings = await prisma.$queryRaw'SELECT * FROM booking WHERE created_date >= ${periodStart} AND created_at <= ${periodEnd} AND booking_user = ${id}';

		let totalEnergyConsumption = 0;
		let iotDevicePerformance = "";

		for (booking in bookings)
		{
			const room = await prisma.room.findOne({
				where:{
					ID: booking.room_id,
				},
			});

			const devices = await prisma.device.findMany({
				where:{
					room_id: booking.room_id,
				}
			})

			const timeUsed = (booking.checkout_time - booking.checkin_time); 
			for(device in devices)
			{
				totalEnergyConsumption += (device.energy_consumption * timeUsed);
			}
		}

		if(totalEnergyConsumption > 10000)
		{
			iotDevicePerformance = "Bad";
		}
		else if(totalEnergyConsumption > 5000)
		{
			iotDevicePerformance = "Average";
		}
		else
		{
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
				generated_by: id
			},
			include: { user: true },
		});

		return { newReport };
	},
	getUsageReport: async function (req){
		const reportID = req.params.id;

		const report = prisma.usage_report.findUnique({
			where:{
				ID: reportID,
			}
		});

		return reportID;
	},
	getEnergyReport: async function(req){
		const reportID = req.params.id;

		const report = prisma.energy_report.findUnique({
			where:{
				ID: reportID,
			},
		})

		return report;
	},
	downloadEnergyReport: async function (req){
		const reportID = req.params.id;

		const report = prisma.usage_report.findUnique({
			where:{
				ID: reportID,
			}
		});

		await prisma.$queryRaw'SELECT * FROM booking WHERE created_date >= ${periodStart} AND created_at <= ${periodEnd} AND booking_user = ${id}';


	}
};
