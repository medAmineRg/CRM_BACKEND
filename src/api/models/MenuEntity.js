import sequelize from "../../config/SequelizeDB.js";
import { DataTypes } from "sequelize";

// define a menu entity using sequelize
const MenuEntity = sequelize.define(
  "menu",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    freezeTableName: true,
  }
);

export default MenuEntity;
