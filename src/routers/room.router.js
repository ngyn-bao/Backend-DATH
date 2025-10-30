import express from 'express'
import { roomController } from "../controllers/room.controller.js"

const router = express.Router()

router.post('/create', roomController.createRoom);

router.get('/', roomController.getAll);
router.get('/:id/checkin', roomController.checkInByID);
router.get('/:id/checkout', roomController.checkOutByID)
router.delete('/:id', roomController.deleteRoomByID);

export default router
