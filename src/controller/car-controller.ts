import { Response, Request } from "express";
import { CarService } from "../service/car-service";

export class CarController {
  private carService = new CarService();

  async carForm(req: Request, res: Response) {
    res.render("pages/add-car");
  }

  async addCar(req: Request, res: Response) {
    const data = req.body;
    const car = await this.carService.addNewCar(data);
    res.render("pages/car-added");
  }

  async getAllCars(req: Request, res: Response) {
    console.log('req.session', req.session);
    const cars = await this.carService.getAllCars();
    res.render("pages/car-list", { cars });
  }

  async getCarById(req: Request, res: Response) {
    const carId = parseInt(req.params.id!, 10);
    const car = await this.carService.getCarById(carId);
    if (car) {
      res.render("pages/car-details", { car });
    } else {
      res.status(404).send("Car not found");
    }
  }
}

