import { Router } from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../service/RoleService.js";

const router = Router();

// Fetch all roles
router.get("/roles", getAllRoles);

// Fetch role by id
router.get("/roles/:id", getRoleById);

// Create a new role
router.post("/roles", createRole);

// Update role details
router.put("/roles/:id", updateRole);

// Delete a role
router.delete("/roles/:id", deleteRole);

export default router;
