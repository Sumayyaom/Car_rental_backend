import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    userid :{
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    username : {
        type : String
    },
    carid : {
        type : mongoose.Types.ObjectId,
        ref : "Car"
    },
    carname : {
        type : String
    },
    carphoto : {
        type : String
    },
    pickupdate : {
        type : Date,
        required : [true, "Please enter the pickup date"]
    },
    dropoffdate : {
        type : Date,
        required : [true, "Please enter the drop off date"]
    },
    totaldays : {
        type : Number,
        required : [true, "Please enter the total days"]
    },
    totalprice : {
        type : Number,
        required : [true, "Please enter the total price"]
    },
 },
 {
    timestamps : true
})

const bookingModel = mongoose.model("Booking",bookingSchema);
export default bookingModel;
