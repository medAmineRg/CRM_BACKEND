import MenuEntity from "./MenuEntity.js";
import RoleEntity from "./RoleEntity.js";

const associations = () => {
  RoleEntity.belongsToMany(MenuEntity, {
    through: "role_menu",
  });
  MenuEntity.belongsToMany(RoleEntity, {
    through: "role_menu",
  });
};

export default associations;
