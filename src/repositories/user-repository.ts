import { User } from "../models/user-model";
import { pool } from "../config/database";
import { ResultSetHeader } from "mysql2";

const USERS_TABLE = "users";

export class UserRepository {
  async create(user: User): Promise<User> {
    const [result] = await pool.query(
      `INSERT INTO ${USERS_TABLE} (username, email, password, role) VALUES (?, ?, ?, ?)`,
      [user.username, user.email, user.password, user.role]
    );
    user.userId = (result as ResultSetHeader).insertId;
    return user;
  }

  async findById(userId: number): Promise<User | null> {
    const [rows] = await pool.query(
      `SELECT * FROM ${USERS_TABLE} WHERE user_id = ?`,
      [userId]
    );
    const users = rows as User[];
    return users[0] || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.query(
      `SELECT * FROM ${USERS_TABLE} WHERE username = ?`,
      [username]
    );
    const users = rows as User[];
    return users[0] || null;
  }
}
