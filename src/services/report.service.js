import prisma from "../common/prisma/prisma.init.js";
export const reportService = {
	report: async function(req)
	{
		const reqBody = req.body;

		const result = await prisma.report.create({
			data: reqBody,
		})
		return {
			items: result || [],
		}
	},
};
