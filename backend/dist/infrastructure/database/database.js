"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = require("mysql2");
const kysely_1 = require("kysely");
const config_1 = require("@infrastructure/config");
const dialect = new kysely_1.MysqlDialect({
    pool: (0, mysql2_1.createPool)({
        database: config_1.config.MYSQL_DATABASE,
        host: config_1.config.HOST,
        user: config_1.config.MYSQL_USER,
        password: config_1.config.MYSQL_PASSWORD,
        port: config_1.config.PORT,
        connectionLimit: 10,
    })
});
exports.db = new kysely_1.Kysely({
    dialect,
});
