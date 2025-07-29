import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || ''
const DATABASE_URL = process.env.DATABASE_URL || ''

export const env = {
  PORT,
  DATABASE_URL
}