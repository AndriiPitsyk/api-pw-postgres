import {ClientConfig} from "pg";

export const authConfig: ClientConfig = {
    host: process.env.HOST_URL,
    port: Number(process.env.DB_PORT),
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATA_BASE,
};
