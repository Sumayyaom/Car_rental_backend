import carModel from '../models/car.js';
import reviewModel from '../models/review.js';

const addCar = async(req,res) => {
        const data = req.body;
        console.log(data);
        const toSave = new carModel(data);
        await toSave.save();
        res.status(200).send('Car registered successfully');  
};

const deleteCar = async(req,res) =>{
    const id = req.params.id;
    const data = await carModel.findByIdAndDelete(id)
    res.status(200).send({data:data, message : 'Deleted Succesfully'})
}

const updateCar = async(req,res) =>{
    const id = req.params.id;
    const newdata = req.body;
    if (!id || !newdata) {
        return res.status(400).send({ message: 'Invalid ID or data' });
    }

    // Ensure that _id is not included in newdata
    delete newdata._id;

    const data = await carModel.findByIdAndUpdate(id,newdata,{new : true});
    if (!data) {
        return res.status(404).send({ message: 'Car not found' });
    }

    res.status(200).send({data:data, message : 'Updated Successfully'});
}

const viewCar = async(req,res) => {
    const data = await carModel.find({});
    res.status(200).send({data:data});
}

const search = async(req,res) => {
    const {name} = req.query;
    const getcars = await carModel.find({place : name});
    res.status(200).send({data:getcars});
}

const viewCarReviews = async(req,res) => {
    const carid = req.params.id;
    const data = await reviewModel.find({carid : carid})
          .select('username carname rating reviewstring')
    res.status(200).send({data:data});
}

export {addCar,deleteCar,updateCar,viewCar,search,viewCarReviews}