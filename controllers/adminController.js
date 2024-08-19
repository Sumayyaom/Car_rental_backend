import bookingModel from "../models/booking.js";
import paymentModel from "../models/payment.js";
import reviewModel from "../models/review.js";
import userModel from "../models/users.js";

const viewUser = async(req,res) =>{
     const data = await userModel.find({});
     res.status(200).send({data:data});
}

const deleteUser = async(req,res) =>{
    const id = req.params.id;
    const data = await userModel.findByIdAndDelete(id)
    res.status(200).send({data:data, message : 'Deleted Succesfully'})
}

const viewBookings = async(req,res) =>{
    const data = await bookingModel.find({});
    res.status(200).send({data:data});
}

const viewReviews = async(req,res) => {
    const data = await reviewModel.find({});
    res.status(200).send({data:data});
}

const viewPayments = async(req,res) => {
    const data = await paymentModel.find({});
    res.status(200).send({data:data});
}

const deletePayment = async(req,res) =>{
    const id = req.params.id;
    const data = await paymentModel.findByIdAndDelete(id)
    res.status(200).send({data:data, message : 'Payment Deleted Succesfully'})
}

export {viewUser,deleteUser,viewReviews,viewBookings,viewPayments,deletePayment}