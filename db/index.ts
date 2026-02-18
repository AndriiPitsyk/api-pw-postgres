import {Client, ClientConfig} from 'pg';
import {UserModel} from './models/UserModel';
import {authConfig} from "./config";

export class Database {
    public users: UserModel;
    private client: Client;

    constructor(config: ClientConfig) {
        this.client = new Client(config);
        this.client.connect();

        this.users = new UserModel(this.client);
    }

    async close() {
        try {
            await this.client.end();
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const db = new Database(authConfig);
