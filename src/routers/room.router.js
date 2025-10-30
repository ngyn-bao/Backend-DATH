import express from 'express'
import { roomController } from "../controllers/room.controller.js"

const router = express.Router()

router.post('/create', roomController.createRoom);

router.get('/', roomController.getRooms);
router.get('/checkin/:id', roomController.checkInByID);
router.get('/checkout/:id', roomController.checkOutByID)
router.delete('/:id', roomController.deleteRoomByID);

export default router
