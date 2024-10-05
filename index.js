import express from "express"
import {  dbConnection } from "./DB connection/dbconnection.js";
import { carRoutes } from "./modules/Cars/cars.routes.js";
import { customerRoutes } from "./modules/Customers/customer.routes.js";
import { rentalRoutes } from "./modules/Rental/rental.routes.js";
import cors from "cors";

const app = express();
const port = 8080;
app.use(cors())
dbConnection();
app.use(express.json());
app.use("/cars",carRoutes);
app.use("/customers",customerRoutes);
app.use("/rentals",rentalRoutes);

app.listen(port, () => {
  console.log(`server is running....`)
})