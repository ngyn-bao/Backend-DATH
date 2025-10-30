const { PrismaClient } = require('./generated/prisma')
const prisma = new PrismaClient()
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
