import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: "postgres", logging: false }
);

export default sequelize;
