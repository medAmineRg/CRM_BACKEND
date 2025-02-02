import { DataTypes } from "sequelize";
import sequelize from "../../config/SequelizeDB.js";

const EmployeeEntity = sequelize.define(
  "employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    hireDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    shift: {
      type: DataTypes.ENUM("morning", "evening", "night"),
      allowNull: false,
    },
    workingHours: {
      type: DataTypes.STRING, // e.g., "08:00-17:00"
      allowNull: true,
    },
    specialization: {
      type: DataTypes.STRING, // e.g., "mechanic", "electrician"
      allowNull: true,
    },
    certifications: {
      type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL supports arrays
      allowNull: true,
    },
    experienceYears: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assignedBay: {
      type: DataTypes.STRING, // e.g., "Bay 1", "Bay 2"
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "on leave", "terminated"),
      allowNull: false,
      defaultValue: "active",
    },
    statusChangedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    statusChangeReason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    supervisorId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Nullable in case some employees don't have a supervisor
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "role",
        key: "id",  // Changed from roleId to id
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// Add a hook to update statusChangedAt
EmployeeEntity.beforeUpdate((employee, options) => {
  if (employee.changed('status')) {
    employee.statusChangedAt = new Date();
  }
});

export default EmployeeEntity;
