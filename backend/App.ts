import fs from "fs";
import express, { Express, Request, Response } from "express";
import cors from "cors";

class Server {
  public app: Express;

  // Use the constructor to create an instance of express and use the class methods.
  constructor() {
    this.app = express();
    this.server();
    this.middlewares();
    this.routes();
  }

  // Create a middlewares method.
  middlewares() {
    this.app.use(express.json());
    // CORS added
    this.app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "http://localhost/",
          /\.localhost\.$/,
        ],
        methods: "GET",
      })
    );
  }

  // Create a method to use the different routes of the app.
  routes() {
    this.app.get("/", (req: Request, res: Response) => {
      try {
        const data: string = fs.readFileSync("data.json", "utf8");
        const finalData = JSON.parse(data);
        return res.json(finalData);
      } catch (err) {
        console.log(err);
        return res.json({ ok: false, users: [] });
      }
    });
  }

  // Create a method to start the server.
  server() {
    this.app.listen(3001, () => {
      console.log("Server listening on port 3001");
    });
  }
}

export default new Server();
