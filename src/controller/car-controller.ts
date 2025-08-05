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
    res.send(`Car is ${car}`);
  }
}
