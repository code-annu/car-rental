import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req: Request, res: Response) => {
  res.render("pages/home");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
