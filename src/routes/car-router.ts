import { Router } from "express";
import { addCar } from "../controller/car-controller";

export const carRouter: Router = Router();

carRouter.get("/add-car", addCar);
