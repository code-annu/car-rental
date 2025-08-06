import express, { Express, Request, Response } from "express";
import path from "path";
import { homeRouter } from "./routes/home-router";
import { carRouter } from "./routes/car-router";
import { User } from "./models/user-model";
import { UserService } from "./service/user-service";
import { authRouter } from "./routes/auth-router";
import { sessionStore } from "./config/session";
const app: Express = express();
const PORT = 3000;
const session = require("express-session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    // Name of the session ID cookie
    secret: "12324sd65f4s65f4s6f7s9f8", // Required secret for signing the session ID cookie
    store: sessionStore,
    resave: false, //  Prevent forcing a session to be saved back to the session store if it was not modified
    saveUninitialized: false, //  Prevent saving unmodified session data to the session store
    cookie: {
      maxAge: 86400000, // Session expiration time in milliseconds (24 hours)
      secure: process.env.NODE_ENV === "production", //  Set secure cookie in production for HTTPS
      httpOnly: true,
    },
  })
);

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
