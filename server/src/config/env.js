const path = require('node:path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
  quiet: true,
});
const { z } = require('zod');

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  MONGODB_URI: z
    .string()
    .regex(/^mongodb(?:\+srv)?:\/\//)
    .default('mongodb://127.0.0.1:27017/azithun'),
  CLIENT_ORIGIN: z.url().default('http://localhost:3000'),
});

module.exports = envSchema.parse(process.env);
