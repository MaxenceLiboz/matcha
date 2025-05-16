import dotenv from 'dotenv';

dotenv.config({path: './.env'})

const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const HOST = process.env.HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const PORT = parseInt(process.env.PORT || "8000");

export const config = {
    PORT: PORT,
    MYSQL_DATABASE: MYSQL_DATABASE,
    HOST: HOST,
    MYSQL_USER: MYSQL_USER,
    MYSQL_PASSWORD: MYSQL_PASSWORD,
};