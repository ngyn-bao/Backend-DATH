import express from 'express'
import { reportController } from "../controllers/report.controller.js"

const router = express.Router()

router.post('/create', reportController.createReport);

router.get('/', reportController.getAll);
router.get('/:id', reportController.reportByUserID);

export default router
