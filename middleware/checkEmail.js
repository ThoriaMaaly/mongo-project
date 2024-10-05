import bcrypt from "bcrypt";
import { db } from "../DB connection/dbconnection.js";
export const checkEmail = async (req, res, next) => {

    const checked = await db.collection("customers").findOne({

        email: req.body.email

    });


    if (checked === null) {
        req.body.password = bcrypt.hashSync(req.body.password, 8)

        next();
    } else {
        
        res.status(409).json({ message: "email is founded, sign up with another email.." })
    }

}