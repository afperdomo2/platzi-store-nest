import * as Joi from 'joi';

const DatabaseType = ['postgres', 'mysql'];

export default Joi.object({
  PORT: Joi.number().required().default(3000),
  API_KEY: Joi.number().required(),

  DATABASE_TYPE: Joi.string()
    .valid(...DatabaseType)
    .required(),

  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required().max(9999),
  POSTGRES_DATABASE: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),

  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.number().required().max(9999),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_ROOT_PASSWORD: Joi.string().required(),
});
