import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.js';
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

// List of allowed origins
const allowedOrigins = [
  'https://car-rental-frontend-f9w3322tq-fathimath-sumayya-os-projects.vercel.app',
  'https://car-rental-frontend-rho.vercel.app',  // Add your allowed origins here
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
connectDB();

const PORT = process.env.PORT;

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Car rental website is listening on port ${PORT}`);
});

// import dotenv from 'dotenv';
// import express from 'express';
// import router from './routes/index.js';
// import connectDB from './db/index.js';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';

// const app = express();
// dotenv.config();

// app.use(cors({
//   origin: 'https://car-rental-frontend-rho.vercel.app',
//   credentials: true,
// }))
// app.use(express.json());
// app.use(cookieParser());
// connectDB();

// const PORT = process.env.PORT;


// app.use('/',router);
// app.listen(PORT, () => {
//     console.log(`Car rental website is listening on port ${PORT}`)
//   })