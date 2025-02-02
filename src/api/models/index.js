import EmployeeEntity from "./EmployeeEntity.js";
import MenuEntity from "./MenuEntity.js";
import RoleEntity from "./RoleEntity.js";
import AuthEntity from "./AuthEntity.js";

const associations = () => {
  // One Role has many Menus
  RoleEntity.belongsToMany(MenuEntity, {
    through: "role_menu",
  });
  // Each MenuEntity belongs to many RoleEntities
  MenuEntity.belongsToMany(RoleEntity, {
    through: "role_menu",
  });
  // One Role has many Employees
  RoleEntity.hasMany(EmployeeEntity, {
    foreignKey: "roleId",
    onDelete: "SET NULL",
  });

  // Each Employee belongs to one Role
  EmployeeEntity.belongsTo(RoleEntity, { foreignKey: "roleId" });
  // One Employee has one AuthEntity
  EmployeeEntity.hasOne(AuthEntity, {
    foreignKey: "employeeId",  // Changed from userId
    onDelete: "CASCADE",
  });
  // Each AuthEntity belongs to one Employee
  AuthEntity.belongsTo(EmployeeEntity, { 
    foreignKey: "employeeId"  // Changed from userId
  });
};

export default associations;
