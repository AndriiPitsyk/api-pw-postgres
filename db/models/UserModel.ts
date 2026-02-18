import { Client } from 'pg';

export class UserModel {
    constructor(private client: Client) {
    }

    async getUserByEmail(email: string): Promise<any> {
        const result = await this.client.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return result.rows[0];
    }

    async getUserById(id: number): Promise<any> {
        const result = await this.client.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return result.rows[0];
    }

    async deleteByEmail(email: string): Promise<void> {
        await this.client.query(`DELETE FROM users WHERE email = $1`, [email]);
    }
}
