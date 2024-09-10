import { cloudinaryInstance } from '../config/cloudinaryConfig.js';
import carModel from '../models/car.js';
import reviewModel from '../models/review.js';

const addCar = async(req,res) => {
        const data = req.body;
        console.log(data);
         // Upload an image
    const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path,{folder: "car"}).catch((error) => {
        console.log(error);
    });
    const toSave = new carModel(data);
    if(uploadResult?.url){
        toSave.photo = uploadResult.url;
    }
        
        await toSave.save();
        res.status(200).send('Car registered successfully');  
};

const deleteCar = async(req,res) =>{
    const id = req.params.id;
    const data = await carModel.findByIdAndDelete(id)
    res.status(200).send({data:data, message : 'Deleted Succesfully'})
}

// const updateCar = async(req,res) =>{
//     const id = req.params.id;
//     const newdata = req.body;
//     if (!id || !newdata) {
//         return res.status(400).send({ message: 'Invalid ID or data' });
//     }

//     // Ensure that _id is not included in newdata
//     delete newdata._id;

//     const data = await carModel.findByIdAndUpdate(id,newdata,{new : true});
//     if (!data) {
//         return res.status(404).send({ message: 'Car not found' });
//     }

//     res.status(200).send({data:data, message : 'Updated Successfully'});
// }
const updateCar = async(req,res) =>{
    const {id} = req.params;
    const newdata = req.body;
    console.log("Newdata=====>",newdata);
    
    if (!id || !newdata) {
        return res.status(400).send({ message: 'Invalid ID or data' });
    }

    // Ensure that _id is not included in newdata
    delete newdata._id;


    if (req.file) {
        newdata.photo = await cloudinaryInstance.uploader.upload(req.file.path,{folder: "car"}).catch((error) => {
            console.log(error);
        });
        // newdata.photo = req.file.path; // Assuming you're saving the path in the database
      }


    const data = await carModel.findByIdAndUpdate(id,newdata,{new : true});
    if (!data) {
        return res.status(404).send({ message: 'Car not found' });
    }

    res.status(200).send({data:data, message : 'Updated Successfully'});
}

const viewAllCars = async(req,res) => {
    const data = await carModel.find({});
    res.status(200).send({data:data});
}

const viewCar = async(req,res) =>{
    const id = req.params.id;
    const data = await carModel.findById(id)
    res.status(200).send({data:data})
}

const search = async(req,res) => {
    const {name} = req.query;
    const getcars = await carModel.find({location : String(name)});
    res.status(200).send({data:getcars});
}

const viewCarReviews = async(req,res) => {
    const carid = req.params.id;
    const data = await reviewModel.find({carid : carid})
          .select('username carname rating reviewstring')
    res.status(200).send({data:data});
}

export {addCar,deleteCar,updateCar,viewCar,search,viewCarReviews,viewAllCars}