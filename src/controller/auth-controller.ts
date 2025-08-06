import { User } from "../models/user-model";
import { UserService } from "../service/user-service";
import { Response, Request } from "express";

export class AuthController {
  private userService = new UserService();

  async registerForm(req: Request, res: Response) {
    res.render("pages/register-form");
  }

  async registerNewUser(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const user: User = {
      username,
      email,
      password,
      role: "user",
    };

    const registeredUser = await this.userService.registerNewUser(user);
    if (registeredUser) {
      console.log("User registered successfully: ", registeredUser);
      res.redirect("/"); // Redirect to login form after successful registration
    } else {
      console.log("Registration failed for user: ", username);
      res.status(400).send("User already exists or registration failed");
    }
  }

  async loginForm(req: Request, res: Response) {
    res.render("pages/login-form");
  }

  async loginUser(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await this.userService.loginUser(username, password);

    if (user) {
      console.log("Login successful for user: ", user);
      res.redirect("/"); // Redirect to home or dashboard after successful login
    } else {
      console.log("Login failed for username: ", username);
      res.status(401).send("Invalid username or password");
    }
  }
}
