import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || ''
const DATABASE_URL = process.env.DATABASE_URL || ''
const SCHEMA_UNIT = process.env.SCHEMA_UNIT || ''
const SCHEMA_INTEGRATION = process.env.SCHEMA_INTEGRATION || ''

export const envTest = {
  PORT,
  DATABASE_URL,
  SCHEMA_UNIT,
  SCHEMA_INTEGRATION,
}