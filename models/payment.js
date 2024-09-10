import mongoose, { Mongoose, Schema } from "mongoose";

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required : [true, "Please enter the amount"]
    },
    paymentMethod: {
        type: String,
        required : [true, "Please enter the payment method"]
    },
    status: {
        type: String,
        enum: ['pending', 'succeeded', 'failed'],
        required : [true, "Please enter the status (pending,completed,failed)"]
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    receiptUrl: {
        type: String
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
        
    // },
    // bookingId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Booking',
       
    // },
    transactionId: {
        type: String,
        unique: true,
        required: true
    }
});

const paymentModel = mongoose.model("Payment",paymentSchema);
export default paymentModel;
