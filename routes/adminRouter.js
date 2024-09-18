import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { authorizeRoles } from '../Authorization/roleAuthorization.js';
import { deleteBooking, deletePayment, deletereview, deleteUser, viewBookings, viewPayments, viewReviews, viewUser } from '../controllers/adminController.js';
const adminRouter = express.Router();

adminRouter.get('/viewuser',asyncHandler(viewUser))
          .delete('/deleteuser/:id',authorizeRoles("admin","user"),asyncHandler(deleteUser))
          .get('/viewbookings',asyncHandler(viewBookings))
          .delete('/deletebooking/:id',authorizeRoles("admin","user"),asyncHandler(deleteBooking))
          .get('/viewreviews',asyncHandler(viewReviews))
          .get('/viewpayments',authorizeRoles("admin"),asyncHandler(viewPayments))
          .delete('/deletepayment/:id',authorizeRoles("admin"),asyncHandler(deletePayment))
          .delete('/deletereview/:id',authorizeRoles("admin"),asyncHandler(deletereview))
export default adminRouter
