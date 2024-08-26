import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { addCar, deleteCar, search, updateCar, viewCar, viewCarReviews } from '../controllers/carController.js';
import { authorizeRoles } from '../Authorization/roleAuthorization.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const carRouter = express.Router();

carRouter.post('/addcar',authorizeRoles("admin"),upload.single("photo"),asyncHandler(addCar))
          .delete('/deletecar/:id',authorizeRoles("admin"),asyncHandler(deleteCar))
          .put('/updatecar/:id',authorizeRoles("admin"),asyncHandler(updateCar))
          .get('/viewcar',asyncHandler(viewCar))
          .get('/viewcarreviews/:id',asyncHandler(viewCarReviews))
          .get('/search',asyncHandler(search))

export default carRouter