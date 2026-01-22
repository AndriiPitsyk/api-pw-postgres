import { ClientConfig } from 'pg';
import { ClientConnection } from './connections/client';
import { UserModel } from './models/UserModel';
import {authConfig} from "./config";

export class Database {
    private connection: ClientConnection;
    public users: UserModel;

    constructor(config: ClientConfig) {
        this.connection = new ClientConnection(config);
        this.users = new UserModel(this.connection);
    }

    async connect() {
        await this.connection.connect();
    }

    async close() {
        await this.connection.close();
    }
}

export const db = new Database(authConfig);
