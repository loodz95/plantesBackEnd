import * as dotenv from "dotenv";
import * as express from "express";
import plantsRouter from "./routes/PlantsRouter";
import { AppDataSource } from "./services/data-source";
import bodyParser = require("body-parser");

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const cors = require("cors");
    app.use(bodyParser.json());
    app.use(cors());
    const port = process.env.PORT || 8080;
    dotenv.config({ path: ".env.local" });
    app.use(express.json());
    app.use("/api/plants", plantsRouter);
    app.listen(8080, () => {
      console.log(
        "Server is running, open http://localhost:8080 to see results"
      );
    });
  })
  .catch((error) => console.log(error));
