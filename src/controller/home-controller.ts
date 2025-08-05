import { Request, Response } from "express";
import { send } from "process";

export async function home(req: Request, res: Response) {
  res.render("pages/home");
}
