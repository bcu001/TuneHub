import { config } from "dotenv";

config();  

export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const CLIENT_URL = process.env.CLIENT_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN;
export const NODE_ENV = process.env.NODE_ENV;
