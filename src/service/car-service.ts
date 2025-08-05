import { CarRepository } from "../repositories/car-repository";
import { Car } from "../models/car-model";

export class CarService {
  private carRepo = new CarRepository();

  async addNewCar(car: Car): Promise<Car> {
    return this.carRepo.create(car);
  }

  async udpateCar(carId: number, car: Car): Promise<void> {
    return this.carRepo.update(carId, car);
  }

  async getAllCars(): Promise<Car[]> {
    return this.carRepo.findAll();
  }
  async getCarById(carId: number): Promise<Car | null> {
    return this.carRepo.findById(carId);
  }

  async deleteCar(carId: number): Promise<void> {
    await this.carRepo.delete(carId);
  }
}
