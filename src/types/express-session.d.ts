// import 'express-session'; // Crucial for module augmentation

// declare module 'express-session' {
//   interface SessionData {
//     userId: number;
//     role: string;
//   }
// }

import { Session } from "express-session";

export interface ISession extends Session {
  userId?: number;
  role?: string;
}
