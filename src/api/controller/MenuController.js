import express from "express";
import * as MenuService from "../service/MenuService.js";

const router = express.Router();

// Get all menus
router.get("/menus", MenuService.getAllMenus);

// Create a new menu
router.post("/menus", MenuService.createMenu);

// get menu by ID
router.get("/menus/:id", MenuService.getMenuById);

// Update menu by ID
router.put("/menus/:id", MenuService.updateMenu);

// Delete menu by ID
router.delete("/menus/:id", MenuService.deleteMenu);

// Get menu permissions
router.get("/menus/:id/permissions", MenuService.getMenuPermissions);

// Update menu permissions
router.put("/menus/:id/permissions", MenuService.updateMenuPermissions);

export default router;
