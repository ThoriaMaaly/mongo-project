import { db } from "../../DB connection/dbconnection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt"
// ***********signing up and adding customer*******
const signup=async(req,res)=>{

await db.collection("customers").insertOne(req.body);
res.status(201).json({message:"welcome,Now sign in.."})

};
// **********sign in*****
const signin = async (req, res) => {
    const customer = await db.collection("customers").findOne({
      
            email: req.body.email

        
    });
    if (customer===null) {
        // that means couldnt find that email

        res.status(401).json({ message: "inncorrect email or password..." });

    }
    else {
     
        const matchedpass = bcrypt.compareSync(req.body.password, customer.password)


        if (matchedpass) {
        
            res.status(200).json({ message: "welcomw...." })
        } else {
            res.status(401).json({ message: "inncorrect email or password..." });
        }

    }


};
//***********get a specific customer***** */
const getSpesificCustomer= async (req, res) => {

    const customer = await db.collection("customers").findOne({
        _id: new ObjectId(req.params.id)
    });
    if (!customer) {
        res.status(400).json({ message: "couldnt find the customer.." })
    } else {
        res.status(200).json({ customer });

    }

};
//***********get all  customers***** */
const allCustomers= async (req, res) => {

    const Customers = await db.collection("customers").find({}).toArray();
    
        res.status(200).json({Customers})



};

//    ********update customer********************
const updateCustomer = async (req, res) => {

    const {matchedCount} = await db.collection("customers").updateOne(
        {
            _id: new ObjectId(req.params.id)
        },
        { $set: req.body });
if(matchedCount>0){res.status(201).json({message:"customer is updated.."})}
 else{
    res.status(401).json({message:"customer not founded"})
 }       
};

// **********delete customer**************
const deleteCustomer = async (req, res) => {

    const {deletedCount} = await db.collection("customers").deleteOne(
        {
            _id: new ObjectId(req.params.id)
        });

        
if(deletedCount>0){res.status(201).json({message:"customer is deleted.."})}
 else{
    res.status(401).json({message:"customer not founded"})
 }       
};

export{signup,signin,getSpesificCustomer,allCustomers,updateCustomer,deleteCustomer}