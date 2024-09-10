import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { CheckoutPayment } from '../controllers/paymentController.js';
const paymentRouter = express.Router();

paymentRouter.post('/create-checkout-session',asyncHandler(CheckoutPayment));

export default paymentRouter
