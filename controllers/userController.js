import bcrypt from 'bcrypt';
import userModel from '../models/users.js';
import bookingModel from '../models/booking.js';
import carModel from '../models/car.js';
import reviewModel from '../models/review.js';
import paymentModel from '../models/payment.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { cloudinaryInstance } from '../config/cloudinaryConfig.js';


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; // Use an environment variable for production

const signUp = async(req,res) => {
    const data = req.body;

    // // Hash the password
    // const saltRounds = 10;  
    // const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // // Replace the plain password with the hashed one
    // data.password = hashedPassword;

    // Upload an image
    const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path,{folder: "user"}).catch((error) => {
        console.log(error);
    });

    const  toSave = new userModel(data);
    if(uploadResult?.url){
        toSave.profilepicture = uploadResult.url;
    }
        await toSave.save();
        res.status(200).send("User registered succesfully"); 
    
}

// const login = async(req,res) => {
//     const data = req.body
//     console.log(data);

//      // Find user by email
//      const user = await userModel.findOne({ email: data.email });
//      if (!user) {
//          return res.status(404).send({ status: false, message: "User not found" });
//      }

//      // Compare the provided password with the hashed password
//      const isPasswordValid = await bcrypt.compare(data.password, user.password);
//      if (!isPasswordValid) {
//          return res.status(401).send({ status: false, message: "Invalid password" });
//      }

//     res.status(200).send({status:true,message:"Login successfull"});
// }

const login = async (req, res) => {
    const data = req.body;

    // Find user by email
    const user = await userModel.findOne({ email: data.email });
    if (!user) {
        return res.status(404).send({ status: false, message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({ status: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
        { 
            userId: user._id, 
            email: user.email, 
            role: user.role}, // Payload
        JWT_SECRET, // Secret key
        { 
            expiresIn: '1h' 
        } // Token expires in 1 hour
    );
     
    res.cookie("Token",token)
    // Send token to the client
    res.status(200).send({
        status: true,
        message: "Login successful",
        token : token
    });
};


const logout = async(req, res) => {
    res.clearCookie('Token'); // Clear the token cookie
    res.status(200).send({ status: true, message: 'Logout successful' });
};

const updateUser = async(req,res) =>{
    const id = req.params.id;
    const newdata = req.body;
    if (!id || !newdata) {
        return res.status(400).send({ message: 'Invalid ID or data' });
    }

    // Ensure that _id is not included in newdata
    delete newdata._id;

    const data = await userModel.findByIdAndUpdate(id,newdata,{new : true});
    if (!data) {
        return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({data:data, message : 'Updated Successfully'});
}

const bookCar = async(req,res) => {
    const {userid,licenseno,carid,pickupdate,dropoffdate,totaldays,totalprice,paymentstatus} = req.body;
    const username = await userModel.findById(userid);
    if (!username) {
        return res.status(404).json({ message: 'User not found' });
    }

    const carname = await carModel.findById(carid);
    if (!carname) {
        return res.status(404).json({ message: 'Car not found' });
    }

    const toSave = new bookingModel({
        userid,
        username: username.username,
        licenseno,
        carid,
        carname: carname.name,
        pickupdate,
        dropoffdate,
        totaldays,
        totalprice,
        paymentstatus
    })
    await toSave.save();
    res.status(200).send("Booking Successfull");
}

const deleteBookings = async(req,res) =>{
    const id = req.params.id;
    const data = await bookingModel.findByIdAndDelete(id)
    res.status(200).send({ message : 'Booking Deleted Succesfully'})
}

const review = async(req,res) => {
    const {userid,carid,rating,reviewstring} = req.body;
    const username = await userModel.findById(userid);
    if (!username) {
        return res.status(404).json({ message: 'User not found' });
    }

    const carname = await carModel.findById(carid);
    if (!carname) {
        return res.status(404).json({ message: 'Car not found' });
    }

    const toSave = new reviewModel({
        userid,
        username: username.username,
        carid,
        carname: carname.name,
        rating,
        reviewstring
    })
    await toSave.save();
    res.status(200).send("Review Successfull");
}

const payment = async(req,res) => {
    const data = req.body
    console.log(data);
    const  toSave = new paymentModel(data);
    await toSave.save();
    res.status(200).send("Payment succesfull");
}


const checkUser = async(req,res,next) =>{
    try{
        const user = req.user;

        if(!user){
            return res.status(400).json({status:false, message :"user not authenticated"});
        }
        res.json({status:true, message :"user authenticated"});
    }catch(error){
        res.status(error.status || 500).json({ message: error.message || "Internal server error"});
    }
};

export {signUp,login,updateUser,bookCar,review,deleteBookings,payment,logout,checkUser}
