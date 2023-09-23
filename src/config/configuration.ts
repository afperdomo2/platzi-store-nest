import { registerAs } from '@nestjs/config/dist';

export default registerAs('config', () => {
  return {
    databaseType: process.env.DATABASE_TYPE,
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    mysql: {
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
    },
    port: parseInt(process.env.PORT, 10),
    apiKey: process.env.API_KEY,
  };
});
