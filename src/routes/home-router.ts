import { home } from "../controller/home-controller";
import { Router } from "express";

export const homeRouter: Router = Router();

homeRouter.get("/", home);

exports.homeRouter = homeRouter;
