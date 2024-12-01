import sequelize from "../../config/SequelizeDB.js";
import { DataTypes } from "sequelize";

// define a role entity using sequelize
const RoleEntity = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default RoleEntity;
