import express from 'express';
import userRouter from './userRouter.js';
import adminRouter from './adminRouter.js';
import carRouter from './carRouter.js';
import paymentRouter from './paymentRouter.js';

const router = express.Router();

router.use('/user',userRouter);
router.use('/admin',adminRouter);
router.use('/car',carRouter);
router.use('/payment',paymentRouter);

export default router