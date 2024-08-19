import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { bookCar, deleteBookings, login, logout, payment, review, signUp, updateUser } from '../controllers/userController.js';
import {authorizeRoles} from '../Authorization/roleAuthorization.js';

const userRouter = express.Router();

userRouter.post('/signup',asyncHandler(signUp))
        .post('/login',asyncHandler(login))
        .post('/logout',asyncHandler(logout))
        .put('/updateuser/:id',asyncHandler(updateUser))
        .post('/book',authorizeRoles("user"),asyncHandler(bookCar))
        .post('/review',authorizeRoles("user"),asyncHandler(review))
        .delete('/deletebooking/:id',authorizeRoles("user"),asyncHandler(deleteBookings))
        .post('/payment',authorizeRoles("user"),asyncHandler(payment))
export default userRouter
