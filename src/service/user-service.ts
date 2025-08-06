import { UserRepository } from "../repositories/user-repository";
import { User } from "../models/user-model";
import bcrypt from "bcrypt";

export class UserService {
  private userRepo = new UserRepository();

  async registerNewUser(user: User): Promise<User | null> {
    const checkUser = await this.userRepo.findByUsername(user.username);
    if (checkUser) {
      console.log("user already exists.");
      return null;
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    console.log("Registering user: ", user);
    return await this.userRepo.create(user);
  }

  async loginUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      console.log("Username not found!");
      return null;
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log("User found: ", user);
      return user;
    }
    console.log("Invalid password!");
    return null;
  }
}
