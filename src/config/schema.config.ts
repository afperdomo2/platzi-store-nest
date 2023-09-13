import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().required().default(3000),
  API_KEY: Joi.number().required(),

  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required().max(9999),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASS: Joi.string().required(),
});
