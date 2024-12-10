import Joi from "joi";

const menuSchemaValidation = Joi.object({
  name: Joi.string().required(),
  permission: Joi.array().items(Joi.string()),
});

export default menuSchemaValidation;
