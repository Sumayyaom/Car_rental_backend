import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { bookCar, booking, checkUser, deleteBookings, login, logout, payment, profile, review, reviewBookedCar, signUp, updateUser } from '../controllers/userController.js';
import {authorizeRoles} from '../Authorization/roleAuthorization.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const userRouter = express.Router();

userRouter.post('/signup', upload.single("profilepicture"),asyncHandler(signUp))
        .post('/login',asyncHandler(login))
        .post('/logout',asyncHandler(logout))
        .put('/updateuser', authorizeRoles("user","admin"),upload.single('profilepicture'),asyncHandler(updateUser))
        .post('/book',authorizeRoles("user"),asyncHandler(bookCar))
        .post('/review',authorizeRoles("user"),asyncHandler(review))
        .delete('/deletebooking/:id',authorizeRoles("user"),asyncHandler(deleteBookings))
        .post('/payment',authorizeRoles("user"),asyncHandler(payment))
        .get('/check-user',authorizeRoles("admin","user"),asyncHandler(checkUser))
        .get('/profile',asyncHandler(profile))
        .get('/bookings',authorizeRoles("admin","user"),asyncHandler(booking))
        .get('/reviewbookedcar/:id',asyncHandler(reviewBookedCar))

export default userRouter
