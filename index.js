import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.js';
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
connectDB();

const PORT = process.env.PORT;


app.use('/',router);
app.listen(PORT, () => {
    console.log(`Car rental website is listening on port ${PORT}`)
  })