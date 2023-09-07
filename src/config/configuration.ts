import { registerAs } from '@nestjs/config/dist';

export default registerAs('config', () => {
  return {
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3307,
      name: process.env.DB_NAME,
    },
    apiKey: process.env.API_KEY,
  };
});
