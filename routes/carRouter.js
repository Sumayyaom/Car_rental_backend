import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { addCar, deleteCar, search, updateCar, viewAllCars, viewCar, viewCarReviews } from '../controllers/carController.js';
import { authorizeRoles } from '../Authorization/roleAuthorization.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const carRouter = express.Router();

carRouter.post('/addcar',authorizeRoles("admin"),upload.single("photo"),asyncHandler(addCar))
          .delete('/deletecar/:id',authorizeRoles("admin"),asyncHandler(deleteCar))
          .put('/updatecar/:id',authorizeRoles("admin"),upload.single('photo'),asyncHandler(updateCar))
          .get('/viewallcars',asyncHandler(viewAllCars))
          .get('/viewcar/:id',asyncHandler(viewCar))
          .get('/viewcarreviews/:id',asyncHandler(viewCarReviews))
          .get('/search',asyncHandler(search))

export default carRouter