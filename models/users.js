import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
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
    confirmPassword : {
        type : String,
        required : true,
       validate: {
            validator: function(el) {
            return el === this.password;
           },
      message: 'Passwords do not match.'
          }
    },
    profilepicture : {
        type : String
    }
 },
 {
    timestamps : true
})

userSchema.pre('save', async function(next) {
    // Only run this function if password was modified
    if (!this.isModified('password')) return next(); 
    // Hash the password
    this.password = await bcrypt.hash(this.password, 10); 
    // Remove confirmPassword field after validation
    this.confirmPassword = undefined;
    next();
  });

const userModel = mongoose.model("User",userSchema);
export default userModel;