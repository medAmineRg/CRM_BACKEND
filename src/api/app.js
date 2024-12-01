import express from "express";
import { configDotenv } from "dotenv";
import logger from "./log/logger.js";
import sequelize from "../config/SequelizeDB.js";
import cors from "cors";

// controller
// change its name to RoleController
// import route from "./controller/RoleController.js";
import RoleController from "./controller/RoleController.js";

configDotenv();
cors();

const app = express();
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection has been established successfully.");
  })
  .catch((error) => {
    logger.error("Unable to connect to the database:", error);
  });

app.use(RoleController);

app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
