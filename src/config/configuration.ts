import { registerAs } from '@nestjs/config/dist';

export default registerAs('config', () => {
  return {
    port: parseInt(process.env.PORT, 10),
    apiKey: process.env.API_KEY,
  };
});
