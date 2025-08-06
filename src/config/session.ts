import dotenv from "dotenv";
import session from "express-session";

dotenv.config();
// const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session); //  Initialize express-mysql-session
// const app = express();

const options = {
  host: process.env.DB_HOST!,
  port: 3306, // Default MySQL port
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!, // Replace with the database name for sessions
  //  Other optional options
  clearExpired: true, // Automatically clear expired sessions
  checkExpirationInterval: 900000, // How frequently expired sessions will be cleared; milliseconds (15 minutes)
  expiration: 86400000, // The maximum age of a valid session; milliseconds (24 hours)
  createDatabaseTable: true, // Whether or not to create the sessions table if it doesn't exist
  schema: {
    tableName: "sessions",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
};

export const sessionStore = new MySQLStore(options);
