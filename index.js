import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.js';
import connectDB from './db/index.js';

const app = express();
dotenv.config();
app.use(express.json());
connectDB();

const PORT = process.env.PORT;

app.use('/',router);
app.listen(PORT, () => {
    console.log(`Car rental website is listening on port ${PORT}`)
  })