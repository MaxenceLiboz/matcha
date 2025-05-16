"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const HOST = process.env.HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const PORT = parseInt(process.env.PORT || "8000");
exports.config = {
    PORT: PORT,
    MYSQL_DATABASE: MYSQL_DATABASE,
    HOST: HOST,
    MYSQL_USER: MYSQL_USER,
    MYSQL_PASSWORD: MYSQL_PASSWORD,
};
