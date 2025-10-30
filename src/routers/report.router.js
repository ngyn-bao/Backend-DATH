import { reportController } from "../controllers/report.controller.js"
import express from 'express'

const reportRouter = express.Router()

router.get('/usage', reportController.getUsageReport);

export default reportRouter
