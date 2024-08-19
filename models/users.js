import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username : {
        type : String,
        minLength : 3,
        required : [true, "Please enter the username"]
    },
    email :{
        type : String,
        required : [true, "Please enter the email"]
    },
    phone : {
        type : String,
        required : [true, "Please enter the Mobile number"]
    },
    address : {
        type : String,
        required : [true, "Please enter your address"]
    },
    role : {
        type : String,
        enum: ['user', 'admin']
    },
    password : {
        type : String,
        required : [true, "Please enter the password"]
    },
    profilepicture : {
        type : String
    }
 },
 {
    timestamps : true
})

const userModel = mongoose.model("User",userSchema);
export default userModel;
