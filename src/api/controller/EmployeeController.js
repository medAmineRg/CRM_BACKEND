import express from "express";
const router = express.Router();
import * as employeeService from "../service/EmployeeService.js";

// POST /api/employees
router.post("/employee", employeeService.createEmployee);

// GET /api/employees
router.get("/employee", employeeService.getAllEmployees);

// GET /api/employees/:id
router.get("/employee/:id", employeeService.getEmployeeById);

// PUT /api/employees/:id
router.put("/employee/:id", employeeService.updateEmployee);

// DELETE /api/employees/:id
router.delete("/employee:id", employeeService.deleteEmployee);

// GET /api/employees/specialization/:specialization
router.get(
  "/employee/specialization/:specialization",
  employeeService.getEmployeesBySpecialization
);

// GET /api/employees/shift/:shift
router.get("/employee/shift/:shift", employeeService.getEmployeesByShift);

export default router;
