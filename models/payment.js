import mongoose, { Mongoose, Schema } from "mongoose";

const paymentSchema = new mongoose.Schema({
    paymentId: Schema.ObjectId,
    amount: {
        type: String,
        required : [true, "Please enter the amount"]
    },
    paymentMethod: {
        type: String,
        required : [true, "Please enter the payment method"]
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        required : [true, "Please enter the status (pending,completed,failed)"]
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    receiptUrl: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    transactionId: {
        type: String
    }
});

const paymentModel = mongoose.model("Payment",paymentSchema);
export default paymentModel;
