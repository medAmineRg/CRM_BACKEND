import Joi from "joi";

const authSchemaValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default authSchemaValidation;
