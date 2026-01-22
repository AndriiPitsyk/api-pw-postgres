import { Client, ClientConfig } from 'pg';

export class ClientConnection {
    private client: Client;

    constructor(config: ClientConfig) {
        this.client = new Client(config);
    }

   async connect() {
        try {
            await this.client.connect();
        } catch (err) {
            throw new Error('DB connection failed: ' + err);
        }
    }

    async close() {
        await this.client.end();
    }

    gitClientInstance() {
    return this.client;
    }
}
