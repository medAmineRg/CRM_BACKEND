import Joi from 'joi';

const employeeSchema = {
  create: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9+\-\s]+$/),
    address: Joi.string(),
    salary: Joi.number().precision(2),
    hireDate: Joi.date().default(Date.now),
    shift: Joi.string().valid('morning', 'evening', 'night').required(),
    workingHours: Joi.string(),
    specialization: Joi.string(),
    certifications: Joi.array().items(Joi.string()),
    experienceYears: Joi.number().integer().min(0),
    assignedBay: Joi.string(),
    status: Joi.string().valid('active', 'on leave', 'terminated').default('active'),
    statusChangeReason: Joi.string(),
    supervisorId: Joi.number().integer(),
    roleId: Joi.number().integer().required(),
    auth: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    }).required()
  }),

  update: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phone: Joi.string().pattern(/^[0-9+\-\s]+$/),
    address: Joi.string(),
    salary: Joi.number().precision(2),
    shift: Joi.string().valid('morning', 'evening', 'night'),
    workingHours: Joi.string(),
    specialization: Joi.string(),
    certifications: Joi.array().items(Joi.string()),
    experienceYears: Joi.number().integer().min(0),
    assignedBay: Joi.string(),
    status: Joi.string().valid('active', 'on leave', 'terminated'),
    statusChangeReason: Joi.string(),
    supervisorId: Joi.number().integer(),
    roleId: Joi.number().integer()
  })
};

export default employeeSchema;
