import express, { Express, Request, Response } from "express";
import path from "path";
import { homeRouter } from "./routes/home-router";
import { carRouter } from "./routes/car-router";
import { User } from "./models/user-model";
import { UserService } from "./service/user-service";
import { authRouter } from "./routes/auth-router";

const app: Express = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(homeRouter);
app.use(carRouter);
app.use(authRouter);

app.get("/test", async (req: Request, res: Response) => {
  const userService = new UserService();
  const user: User = {
    username: "anurag",
    email: "anurag@gmail.com",
    password: "12345678",
    role: "user",
  };

  // const result = await userService.registerNewUser(user);
  const result = await userService.loginUser("anurag", "12345678");
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
