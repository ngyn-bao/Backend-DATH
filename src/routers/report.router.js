import { reportController } from "../controllers/report.controller.js"
import express from 'express'

const reportRouter = express.Router()

router.post('/usage', reportController.createUsageReport);
router.post('/energy', reportController.createEnergyReport);
router.get('/usage/:id', reportController.getUsageReport);
router.get('/energy/:id', reportController.getEnergyReport);

export default reportRouter
