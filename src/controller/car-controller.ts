import { Response, Request } from "express";

export async function addCar(req: Request, res: Response) {
  res.render("pages/add-car");
}
