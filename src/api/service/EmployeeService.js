import Employee from "../models/EmployeeEntity.js";
import sequelize from "../../config/SequelizeDB.js";
import AuthEntity from "../models/AuthEntity.js";
import RoleEntity from "../models/RoleEntity.js";
import employeeSchema from "../schema/EmployeeSchemaValidation.js";

// modules
import bcrypt from "bcrypt";

// Create new employee
const createEmployee = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = employeeSchema.create.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const t = await sequelize.transaction();
    
    try {
      const { auth, ...employeeData } = value;

      // auth.email already exists
      const existingAuth = await AuthEntity.findOne({
        where: { email: auth.email },
      });

      if (existingAuth) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Create employee first
      const employee = await Employee.create(employeeData, { transaction: t });

      // hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(auth.password, salt);

      // If auth credentials provided, create auth entry
      if (auth) {
        await AuthEntity.create(
          {
            employeeId: employee.id, // Changed from userId
            email: auth.email,
            password: hashedPassword,
          },
          { transaction: t }
        );
      }

      await t.commit();
      return res.status(201).json(employee);
    } catch (error) {
      await t.rollback();
      return res.status(500).json({
        error: "Failed to create employee and auth: " + error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Validation error: " + error.message,
    });
  }
};

// Modify getAllEmployees to include role and auth info
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [{ model: RoleEntity }, { model: AuthEntity }],
    });
    return res.status(200).json(employees);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch employees: " + error.message });
  }
};

// Modify getEmployeeById to include role and auth info
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: [{ model: RoleEntity }, { model: AuthEntity }],
    });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch employee: " + error.message });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = employeeSchema.update.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const [updated] = await Employee.update(value, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const updatedEmployee = await Employee.findByPk(req.params.id);
    return res.status(200).json(updatedEmployee);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to update employee: " + error.message });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to delete employee: " + error.message });
  }
};

// Get employees by specialization
const getEmployeesBySpecialization = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: { specialization: req.params.specialization },
    });
    return res.status(200).json(employees);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch employees: " + error.message });
  }
};

// Get employees by shift
const getEmployeesByShift = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: { shift: req.params.shift },
    });
    return res.status(200).json(employees);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch employees: " + error.message });
  }
};

export {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesBySpecialization,
  getEmployeesByShift,
};
