import Joi from "joi";

const menuSchemaValidation = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string()),
  route: Joi.string().required(),
  icon: Joi.string(),
  order: Joi.number().required(),
});

export default menuSchemaValidation;
