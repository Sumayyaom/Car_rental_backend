import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.ObjectId;
const reviewSchema = new Schema({
    reviewid : ObjectId,
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
    rating : {
        type : Number,
        min : 1,
        max : 5,
        required : [true, "Please give the rating"]
    },
    reviewstring : {
        type : String,
        required : [true, "Please enter your review"]
    }
 },
 {
    timestamps : true
})

const reviewModel = mongoose.model("Review",reviewSchema);
export default reviewModel;
