import { registerAs } from '@nestjs/config/dist';

export default registerAs('config', () => {
  return {
    port: parseInt(process.env.PORT, 10),
    apiKey: process.env.API_KEY,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      name: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
    },
  };
});
