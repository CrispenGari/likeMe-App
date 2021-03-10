import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 3001 || process.env.PORT;

class Server {
  constructor() {}

  middleWays() {
    app.use(express.json());
    app.use(cors());
  }

  routes() {
    app.get("/", (req, res) => {
      res.status(200).send("LikeMe BACKEND DEFAULT ROUTE");
    });
  }
  startServer() {
    this.middleWays();
    this.routes();
    app.listen(PORT, (error) => {
      if (error) {
        return console.log(error);
      }
      console.log("THE SERVER IS RUNNING ON PORT: " + PORT);
      console.log(`Visit: http://localhost:${PORT}/`);
    });
  }
}

const server = new Server();
export default server;
