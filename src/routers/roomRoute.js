import express from 'express'
import { roomController } from "../controllers/room_controller.js"

const router = express.Router()

router.post('/create', roomController.createRoom);

router.get('/', roomController.getAll);
router.delete('/:id', roomController.deleteRoomByID);

export default router
