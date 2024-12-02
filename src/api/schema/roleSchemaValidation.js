import Joi from "joi";

const roleSchemaValidation = Joi.object({
  name: Joi.string().required(),
});

export default roleSchemaValidation;
