import express from 'express';
import userRouter from './userRouter.js';
import adminRouter from './adminRouter.js';
import carRouter from './carRouter.js';

const router = express.Router();

router.use('/user',userRouter);
router.use('/admin',adminRouter);
router.use('/car',carRouter);

export default router