import { DB } from "./db";
import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";
import { config } from "@infrastructure/config";

const dialect = new MysqlDialect({
  pool: createPool({
    database: config.MYSQL_DATABASE,
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    connectionLimit: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
