import { Router } from "express"
import { addrental, deleterental, getAllRental, getrental, updaterental } from "./rental.controller.js";
export const rentalRoutes= Router();
rentalRoutes.post("/",addrental)
rentalRoutes.get("/",getAllRental)
rentalRoutes.get("/:id",getrental)
rentalRoutes.delete("/:id",deleterental)
rentalRoutes.put("/:id",updaterental)