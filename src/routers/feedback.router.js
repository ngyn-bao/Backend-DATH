import { feedbackController } from "../controllers/feedback.controller.js"
import express from 'express'

const feedbackRouter = express.Router()

feedbackRouter.get('/:id', feedbackController.getFeedback);
feedbackRouter.get('/booking/:id', feedbackController.getFeedbackOfBooking);
feedbackRouter.post('/', feedbackController.createFeedback);

export default feedbackRouter
