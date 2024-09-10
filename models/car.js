import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.ObjectId;
const carSchema = new Schema({
    name :{
        type : String,
        required : [true, "Please enter the car name"]
    },
    modelno : {
        type : String,
        required : [true, "Please enter the model number"]
    },
    brand : {
        type : String,
        required : [true, "Please enter your brand name"]
    },
    price : {
        type : String,
        required : [true, "Please enter the price per day"]
    },
    fueltype : {
        type : String,
        required : [true, "Please enter the fueltype"]
    },
    transmission : {
        type : String,
        required : [true, "Please enter the transmission"]
    },
    location : {
        type : String,
        required : [ true, "Please enter the transmission"] 
    },
    photo : {
        type : String
    }
 },
 {
    timestamps : true
})

const carModel = mongoose.model("Car",carSchema);
export default carModel;
