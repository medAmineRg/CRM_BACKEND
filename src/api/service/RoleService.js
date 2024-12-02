import RoleEntity from "../models/RoleEntity.js";

// Fetch all roles
export const getAllRoles = async (req, res) => {
  const roles = await RoleEntity.findAll();
  return res.status(200).json(roles);
};

// Fetch role by id
export const getRoleById = async (req, res) => {
  // Logic to fetch a role by id from the database
  const { id } = req.params;
  const role = await RoleEntity.findByPk(id);
  if (!role) {
    return res.status(404).json({ error: "Role not found" });
  }
  return res.status(200).json(role);
};

// Create a new role
export const createRole = async (req, res) => {
  // Logic to create a new role in the database
  const { name } = req.body;
  const role = await RoleEntity.create({ name });
  return res.status(201).json(role);
};

// Update role details
export const updateRole = async (req, res) => {
  // Logic to update role details in the database
  const { id } = req.params;
  const { name } = req.body;
  const role = await RoleEntity.findByPk(id);
  if (!role) {
    return res.status(404).json({ error: "Role not found" });
  }
  role.name = name;
  await role.save();
  return res.status(200).json(role);
};

// Delete a role
export const deleteRole = async (req, res) => {
  // Logic to delete a role from the database
  const { id } = req.params;
  const role = await RoleEntity.findByPk(id);
  if (!role) {
    return res.status(404).json({ error: "Role not found" });
  }
  await role.destroy();
  return res.status(204).send();
};
