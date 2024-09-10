import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { authorizeRoles } from '../Authorization/roleAuthorization.js';
import { deleteBooking, deletePayment, deleteUser, viewBookings, viewPayments, viewReviews, viewUser } from '../controllers/adminController.js';
const adminRouter = express.Router();

adminRouter.get('/viewuser',authorizeRoles("admin"),asyncHandler(viewUser))
          .delete('/deleteuser/:id',authorizeRoles("admin"),asyncHandler(deleteUser))
          .get('/viewbookings',authorizeRoles("admin"),asyncHandler(viewBookings))
          .delete('/deletebooking/:id',authorizeRoles("admin"),asyncHandler(deleteBooking))
          .get('/viewreviews',authorizeRoles("admin"),asyncHandler(viewReviews))
          .get('/viewpayments',authorizeRoles("admin"),asyncHandler(viewPayments))
          .delete('/deletepayment/:id',authorizeRoles("admin"),asyncHandler(deletePayment))

export default adminRouter
