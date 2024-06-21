import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  connection: process.env.RDBMS_CONNECTION || 'mysql',
  host: process.env.RDBMS_HOST || 'localhost',
  username: process.env.RDBMS_USERNAME || 'root',
  password: process.env.RDBMS_PASSWORD || 'root',
  database: process.env.RDBMS_DATABASE || 'db_myshop',
  port: parseInt(process.env.RDBMS_PORT, 10) || 3307,
}));
