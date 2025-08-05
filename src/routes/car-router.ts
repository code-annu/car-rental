import { Router } from "express";
import { CarController } from "../controller/car-controller";

export const carRouter: Router = Router();
const carController = new CarController();

carRouter.get("/car-form", carController.carForm);
carRouter.post("/add-car", carController.addCar.bind(carController));
carRouter.get("/cars", carController.getAllCars.bind(carController));
carRouter.get("/car/:id", carController.getCarById.bind(carController));
