import express from "express";
import { configDotenv } from "dotenv";
import logger from "./log/logger.js";
import sequelize from "../config/SequelizeDB.js";
import cors from "cors";

// load entity
import RoleEntity from "./models/RoleEntity.js";
import MenuEntity from "./models/MenuEntity.js";
import AuthEntity from "./models/AuthEntity.js";
import EmployeeEntity from "./models/EmployeeEntity.js";
import associations from "./models/index.js";

// controller
// change its name to RoleController
// import route from "./controller/RoleController.js";
import RoleController from "./controller/RoleController.js";
import MenuController from "./controller/MenuController.js";
import AuthController from "./controller/AuthController.js";
import EmployeeController from "./controller/EmployeeController.js";

configDotenv();
cors();

const app = express();
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    associations();
    logger.info("Connection has been established successfully.");
    // drop all tables and recreate them
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    logger.info("All models were synchronized successfully.");
  })
  .catch((error) => {
    logger.error("Unable to connect to the database:", error);
  });

app.use(RoleController);
app.use(MenuController);
app.use(AuthController);
app.use(EmployeeController);

const server = app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});

export { server, app };
