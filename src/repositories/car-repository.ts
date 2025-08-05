import { Car } from "../models/car-model";
import { pool } from "../config/database";
import { ResultSetHeader } from "mysql2";

const CARS_TABLE = "cars";

export class CarRepository {
  async create(car: Car): Promise<Car> {
    const [result] = await pool.query(
      `INSERT INTO ${CARS_TABLE} (brand_name, model_name, price, image_url) VALUES (?, ?, ?, ?)`,
      [car.brandName, car.modelName, car.price, car.imageUrl]
    );
    car.carId = (result as ResultSetHeader).insertId;
    return car;
  }

  async update(carId: number, car: Car) {
    await pool.query(
      `UPDATE ${CARS_TABLE} SET brand_name = ?, model_name = ?, price = ?, image_url = ? WHERE car_id = ?`,
      [car.brandName, car.modelName, car.price, car.imageUrl, carId]
    );
  }

  async findById(carId: number): Promise<Car | null> {
    const [rows] = await pool.query(
      `SELECT * FROM ${CARS_TABLE} WHERE car_id = ?`,
      [carId]
    );
    const cars = rows as Car[];
    return cars[0] || null;
  }

  async findAll(): Promise<Car[]> {
    const [rows] = await pool.query(`SELECT * FROM ${CARS_TABLE}`);
    return rows as Car[];
  }

  async delete(carId: number): Promise<void> {
    await pool.query(`DELETE FROM ${CARS_TABLE} WHERE car_id = ?`, [carId]);
    console.log("deleted.");
  }
}
