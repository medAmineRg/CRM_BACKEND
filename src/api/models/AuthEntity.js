import { DataTypes } from "sequelize";
import sequelize from "../../config/SequelizeDB.js";

const AuthEntity = sequelize.define("AuthEntity", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default AuthEntity;
