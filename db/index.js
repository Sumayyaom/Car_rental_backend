import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const DB_NAME = process.env.DB_NAME;

const connectDB = async () =>
{
    mongoose.connect("mongodb+srv://sumayyaom18:KNItak915sGtQkTE@cluster0.bskq6f4.mongodb.net/Car_Rental")
    .then(() =>{
        console.log("Db connected successfully");
    })
    .catch((err) => console.log(err))
}

export default connectDB;
