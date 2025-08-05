import express, { Express, Request, Response } from "express";
import path from "path";
import { homeRouter } from "./routes/home-router";
import { carRouter } from "./routes/car-router";

const app: Express = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRouter);
app.use(carRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
