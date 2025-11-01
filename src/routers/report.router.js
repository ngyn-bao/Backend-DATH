import { reportController } from "../controllers/report.controller.js"
import express from 'express'

const reportRouter = express.Router()

reportRouter.post('/usage', reportController.createUsageReport);
reportRouter.post('/energy', reportController.createEnergyReport);
reportRouter.get('/usage/:id', reportController.getUsageReport);
reportRouter.get('/energy/:id', reportController.getEnergyReport);

export default reportRouter
