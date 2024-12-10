import MenuEntity from "../models/MenuEntity.js";
import menuSchemaValidation from "../schema/menuSchemaValidation.js";

// Fetch all menus
export const getAllMenus = async (req, res) => {
  const menus = await MenuEntity.findAll();
  return res.status(200).json(menus);
};

// Fetch menu by id
export const getMenuById = async (req, res) => {
  const { id } = req.params;
  const menu = await MenuEntity.findByPk(id);
  if (!menu) {
    return res.status(404).json({ error: "Menu not found" });
  }
  return res.status(200).json(menu);
};

// Create a new menu
export const createMenu = async (req, res) => {
  const { error } = menuSchemaValidation.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const { name, permissions } = req.body;
  const menu = await MenuEntity.create({ name, permissions });
  return res.status(201).json(menu);
};

// Update menu details
export const updateMenu = async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;
  const menu = await MenuEntity.findByPk(id);
  if (!menu) {
    return res.status(404).json({ error: "Menu not found" });
  }
  menu.name = name;
  menu.permissions = permissions;
  await menu.save();
  return res.status(200).json(menu);
};

// Delete a menu
export const deleteMenu = async (req, res) => {
  const { id } = req.params;
  const menu = await MenuEntity.findByPk(id);
  if (!menu) {
    return res.status(404).json({ error: "Menu not found" });
  }
  await menu.destroy();
  return res.status(204).send();
};

// Update menu permissions
export const updateMenuPermissions = async (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;
  const menu = await MenuEntity.findByPk(id);
  if (!menu) {
    return res.status(404).json({ error: "Menu not found" });
  }
  menu.permissions = permissions;
  await menu.save();
  return res.status(200).json(menu);
};

// Get menu permissions
export const getMenuPermissions = async (req, res) => {
  const { id } = req.params;
  const menu = await MenuEntity.findByPk(id);
  if (!menu) {
    return res.status(404).json({ error: "Menu not found" });
  }
  return res.status(200).json({ permissions: menu.permissions });
};
