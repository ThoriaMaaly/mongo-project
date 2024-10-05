import { ObjectId } from "mongodb";
import { db } from "../../DB connection/dbconnection.js";

//***adding rental**** */
const addrental = async (req, res) => {
    // check first for available customer id

    const customer = await db.collection("customers").findOne({
        _id: new ObjectId(req.body.customerid)
    });
    if (!customer) {
        return res.status(401).json({ message: "customer not found.." })
    } else {

        // check first for available carid

        const car = await db.collection("car").findOne({
            _id: new ObjectId(req.body.carid)
        });

        if (car !== null) {
            // this means the car is founded then check rental status

            if (car.rentalStatus == "available") {
                const rental = await db.collection("rental").insertOne({

                    "carId": new ObjectId(req.body.carid),
                    "customerId": new ObjectId(req.body.customerid),
                    "rentedAt": new Date(req.body.rentedAt),
                    "returnedAt": new Date(req.body.returnedAt)
                });
                // change the rental status*****************************
                await db.collection("car").updateOne({
                    _id: new ObjectId(req.body.carid)
                }, { $set: { rentalStatus: "rented" } })
                res.json({ rental })

            } else {
                res.json({ message: "car is rented..." })
            }


        } else {

            return res.status(401).json({ message: "car not found.." })

        }
    }


};
//******get rental */
const getrental = async (req, res) => {
    const rental = await db.collection('rental').find({
        _id: new ObjectId(req.params.id)
    })

    res.status(200).json({ rental })

};

//*****get all rental****************/

const getAllRental = async (req, res) => {
    const allRental = await db.collection('rental').find({}).toArray();

    res.status(200).json({ allRental })

};

//    ********update rental********************

const updaterental = async (req, res) => {

    const { matchedCount } = await db.collection("rental").updateOne(
        {
            _id: new ObjectId(req.params.id)
        },
        {
            $set: {
                "carId": new ObjectId(req.body.carid),
                "customerId": new ObjectId(req.body.customerid),
                "rentedAt": new Date(req.body.rentedAt),
                "returnedAt": new Date(req.body.returnedAt)
            }
        });
    if (matchedCount > 0) { res.status(201).json({ message: "rental is updated.." }) }
    else {
        res.status(401).json({ message: "rental not founded" })
    }
};

// **********delete rental**************
const deleterental = async (req, res) => {

    // check rental is found or not...
    const deletedrental = await db.collection("rental").findOne({
        _id: new ObjectId(req.params.id)
    });
    // not found
    if (!deletedrental) {

        res.status(401).json({ message: "rental not founded" })
    } else {
        // rental is found  befor deleting we must chang rentalstatus in car...

        await db.collection("car").updateOne({

            // use the rental we find to know which car was rented...
            _id: new ObjectId(deletedrental.carId)
        }, { $set: { rentalStatus: "available" } });

        const { deletedCount } = await db.collection("rental").deleteOne(
            {
                _id: new ObjectId(req.params.id)
            });
        if (deletedCount > 0) {

            res.status(201).json({ message: "rental is deleted.." })
        }
        else {
            res.status(401).json({ message: "couldnt delete " })
        }

    }




};
export { addrental, getrental, getAllRental, deleterental, updaterental }