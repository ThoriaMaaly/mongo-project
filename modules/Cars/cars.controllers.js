import { ObjectId } from "mongodb";
import { db } from "../../DB connection/dbconnection.js";

// ****add car****
const addCar = async (req, res) => {
    const car = await db.collection("car").insertOne(req.body);
    res.json({ car })

};
// *****get specific car**********
const getSpesificCar = async (req, res) => {

    const car = await db.collection("car").findOne({
        _id: new ObjectId(req.params.id)
    });
    if (!car) {
        res.status(400).json({ message: "couldnt find the car.." })
    } else {
        res.status(200).json({ car });

    }

};
// *****get All cars **********
const getAllCars = async (req, res) => {

    const allCars = await db.collection("car").find({}).toArray();
    res.status(200).json({ allCars })

};

//    ********update car********************

const updateCar = async (req, res) => {

    const {matchedCount} = await db.collection("car").updateOne(
        {
            _id: new ObjectId(req.params.id)
        },
        { $set: req.body });
if(matchedCount>0){res.status(201).json({message:"car is updated.."})}
 else{
    res.status(401).json({message:"car not founded"})
 }       
};


// **********delete car**************
const deleteCar = async (req, res) => {

    const {deletedCount} = await db.collection("car").deleteOne(
        {
            _id: new ObjectId(req.params.id)
        });

        
if(deletedCount>0){res.status(201).json({message:"car is deleted.."})}
 else{
    res.status(401).json({message:"car not founded"})
 }       
};
//******find car by model******** */
const carByModel=async(req,res)=>{
const [a,b]= req.query.name.split(","); ///**the returened is array contian string values then will be destructed */
const cars= await db.collection("car").find({
   $or:[{name:a},{name:b}]
}).toArray();
res.json({cars})

};



//******get available car of specific model************************** */

const availableModels=async(req,res)=>{
const availableCars= await db.collection("car").find({

$and:[{name:req.query.name},{rentalStatus:"available"}]

}).toArray();
res.status(200).json({availableCars})
};




//******get rented cars or specific model****************************** */
const RentedOrSpecific =async(req,res)=>{
const cars= await db.collection("car").find({

$or:[{name:req.query.name},{rentalStatus:"rented"}]

}).toArray();
res.status(200).json({cars})
};



//******get rented cars or available specific model******** */
const RentedOrAvailableSpecific =async(req,res)=>{
const cars= await db.collection("car").find({


$or:[
    // available of specific model..
    {
        $and:[{name:req.query.name},{rentalStatus:"available"}]
    },
    // or rented
    {rentalStatus:"rented"}
]

}).toArray();
res.status(200).json({cars})
};


export { addCar, getSpesificCar, getAllCars,updateCar,deleteCar,carByModel,availableModels,RentedOrSpecific,RentedOrAvailableSpecific }