import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'Pet Schedule API',
  env: process.env.APP_ENV || 'local',
  debug: process.env.APP_DEBUG === 'true',
  url: process.env.APP_URL || 'localhost',
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) :5000,
}));