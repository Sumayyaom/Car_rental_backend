import bookingModel from "../models/booking.js";
import paymentModel from "../models/payment.js";
import reviewModel from "../models/review.js";
import userModel from "../models/users.js";

const viewUser = async(req,res) =>{
     const data = await userModel.find({});
     res.status(200).send({data:data});
}

const deleteUser = async(req,res) =>{
    const { id } = req.params;
    console.log("User ID received:", id);
    const user = await userModel.findByIdAndDelete(id);
    if(user){
        return res.status(200).json({ success: true, message: "User deleted successfully", data: user });
    }
    else{
        return res.status(404).json({ success: false, message: "User not found" });
    }
} 

const viewBookings = async(req,res) =>{
    const data = await bookingModel.find({});
    res.status(200).send({data:data});
}


const deleteBooking = async(req,res) =>{
    const { id } = req.params;
    console.log("Booking ID received:", id);
    const booking = await bookingModel.findByIdAndDelete(id);
    if(booking){
        return res.status(200).json({ success: true, message: "Booking deleted successfully", data: booking });
    }
    else{
        return res.status(404).json({ success: false, message: "Booking not found" });
    }
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
    const {id} = req.params;
    const data = await paymentModel.findByIdAndDelete(id)
    res.status(200).send({data:data, message : 'Payment Deleted Succesfully'})
}

export {viewUser,deleteUser,viewReviews,viewBookings,viewPayments,deletePayment, deleteBooking}