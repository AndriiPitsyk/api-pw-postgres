import { ClientConnection } from '../connections/client';
import { Client } from 'pg';

export class UserModel {
    private client: Client;

    constructor(private connection: ClientConnection) {
        this.client = this.connection.gitClientInstance();
    }

    async getUserByEmail(email: string): Promise<object> {
        const result = await this.client.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return result.rows[0];
    }

    async getUserById(id: number): Promise<object> {
        const result = await this.client.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return result.rows[0];
    }

    async deleteByEmail(email: string) {
        await this.client.query(`DELETE FROM users WHERE email = $1`, [email]);
    }
}
