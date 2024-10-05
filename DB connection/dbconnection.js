
import { MongoClient, Timestamp } from 'mongodb';
//>>>>>>>>>>>> url connection...

const client = new MongoClient('mongodb://localhost:27017');

export const dbConnection = () => {
    client.connect().then(() => {

        console.log("db connected succefully....")
    }
    ).catch(() => {
        console.log("db error......")

    })

};


export const db = client.db("CarRental");

  
  




