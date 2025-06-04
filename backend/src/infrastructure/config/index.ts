import dotenv from 'dotenv';
import path from 'path'

dotenv.config({path: path.join(__dirname + "/.env")})

const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const HOST = process.env.HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_PORT = parseInt(process.env.MYSQL_PORT || "8306");
const PORT = parseInt(process.env.PORT || "8000");


console.log('Fetching the .env file');
console.log('Host:', HOST);
console.log('User:', MYSQL_USER);
console.log('Database:', MYSQL_DATABASE);
console.log('Mysql port:', MYSQL_PORT);
console.log('Backend port:', PORT);

export const config = {
    PORT: PORT,
    MYSQL_DATABASE: MYSQL_DATABASE,
    HOST: HOST,
    MYSQL_USER: MYSQL_USER,
    MYSQL_PASSWORD: MYSQL_PASSWORD,
    MYSQL_PORT: MYSQL_PORT
};