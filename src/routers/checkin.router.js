import express from "express";
import { checkinController } from "../controllers/checkin.controller.js";

const checkinRouter = express.Router();

checkinRouter.get('/:id', checkinController.checkin);

export default checkinRouter;
