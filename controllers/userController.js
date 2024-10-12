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
const JWT_SECRET = process.env.JWT_SECRET; 

const signUp = async (req, res) => {
    try {
        const data = req.body;

        const existingUser = await userModel.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({message: "Email is already registered. Please use a different email" });
        }

        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, { folder: "user" }).catch((error) => {
            console.log(error);
            return res.status(500).json({message: "Image upload failed." });
        });

        const toSave = new userModel(data);

        if (uploadResult?.url) {
            toSave.profilepicture = uploadResult.url;
        }
        await toSave.save();
        res.status(200).json({ success:true, message: "User registered successfully" });

    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({message: "Something went wrong during sign up. Please try again." });
    }
};



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
            userName: user.username,
            email: user.email, 
            role: user.role}, // Payload
        JWT_SECRET, // Secret key
        { 
            expiresIn: '1h' 
        } // Token expires in 1 hour
    );
     
    res.cookie("Token",token, {
        httpOnly: false, // Accessible to client-side scripts
        secure: process.env.NODE_ENV === "production",
        sameSite: "None"
    })
    // sameSite: "None",

    res.cookie("userId", user._id.toString(), {
        httpOnly: false, // Accessible to client-side scripts
        secure: process.env.NODE_ENV === "production",
        sameSite: "None"
    });
    // sameSite: "None"

    // Send token to the client
    res.status(200).send({
        status: true,
        message: "Login successful",
        token : token,
        role : user.role
    });
};


const logout = async(req, res) => {
    res.clearCookie('Token'); // Clear the token cookie
    res.status(200).send({ status: true, message: 'Logout successful'});
};

const updateUser = async(req,res) =>{
    const id = req.user.userId;
    const newdata = req.body;
    if (!id || !newdata) {
        return res.status(400).send({ message: 'Invalid ID or data' });
    }

    // Ensure that _id is not included in newdata
    delete newdata._id;

    if (req.file) {
        newdata.photo = await cloudinaryInstance.uploader.upload(req.file.path,{folder: "user"}).catch((error) => {
            console.log(error);
        });
       
      }



    const data = await userModel.findByIdAndUpdate(id,newdata,{new : true});
    if (!data) {
        return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({data:data, message : 'Updated Successfully'});
}

const bookCar = async(req,res) => {
    const {userid,carid,pickupdate,dropoffdate,totaldays,totalprice,paymentstatus} = req.body;
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
        carid,
        carname: carname.name,
        carphoto: carname.photo,
        pickupdate,
        dropoffdate,
        totaldays,
        totalprice,
        paymentstatus
    })
    const savedBooking = await toSave.save();
    res.status(200).send({message: 'Booking successful', bookingId: savedBooking._id});
}

const updatePaymentStatus = async (req, res) => {
    const { bookingId, paymentstatus } = req.body;
    console.log("Booking id in backend===>", bookingId);
    console.log("Paymentstatus in backend===>", paymentstatus);
    // Validate input
    if (!bookingId || !paymentstatus) {
        return res.status(400).json({ message: 'Booking ID and payment status are required' });
    }

    try {
        // Find the booking by ID
        const booking = await bookingModel.findById(bookingId); // Corrected line
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Update the payment status
        booking.paymentstatus = paymentstatus;

        // Save the updated booking
        await booking.save();

        res.status(200).json({ message: 'Payment status updated successfully', booking });
    } catch (error) {
        console.error('Error updating payment status:', error); // More informative error log
        res.status(500).json({ message: 'Server error, could not update payment status', error: error.message });
    }
};



const deleteBookings = async(req,res) =>{
    const { userId } = req.user;
    const data = await bookingModel.findByIdAndDelete(userId)
    if (!data) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).send({ message : 'Booking Deleted Succesfully',data: data})
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
        carname: carname.carname,
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

const profile = async(req,res,next) =>{
    try {
        // Get user ID or email from the decoded token
        const { userId } = req.user;

        // Fetch user data from the database using the ID from the token
        const user = await userModel.findById(userId); 

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User data fetched", data: user });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
}

const booking = async(req,res) => {
    try {
        // Get user ID or email from the decoded token
        const { userId } = req.user;

        // Fetch user data from the database using the ID from the token
        const booking = await bookingModel.find({userid: userId}); 

        if (!booking) {
            return res.status(404).json({ success: false, message: "No bookings" });
        }

        res.json({ success: true, message: "Bookings fetched", data: booking });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
}

const reviewBookedCar = async(req,res) =>{
    const id = req.params.id;
    const data = await bookingModel.findById(id)
    res.status(200).send({data:data, message : 'booking fetched'})
}

export {signUp,login,updateUser,bookCar,review,deleteBookings,payment,logout,checkUser,profile,booking,reviewBookedCar,updatePaymentStatus }
