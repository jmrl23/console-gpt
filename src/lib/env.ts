import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const { OPENAPI_API_KEY, OPENAI_BASE_URL } = process.env;

export { OPENAPI_API_KEY, OPENAI_BASE_URL };
