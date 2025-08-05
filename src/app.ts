import express, { Express, Request, Response } from "express";
import path from "path";
import { homeRouter } from "./routes/home-router";
import { carRouter } from "./routes/car-router";
import { CarRepository } from "./repositories/car-repository";
import { Car } from "./models/car-model";

const app: Express = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(homeRouter);
app.use(carRouter);

app.get("/test", (req: Request, res: Response) => {
  const carRepo = new CarRepository();
  const car: Car = {
    brandName: "Jaguar",
    modelName: "X6",
    price: 120.12,
    imageUrl: "http://jaguar.com",
  };
  carRepo.delete(3);
  res.send("done.");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
