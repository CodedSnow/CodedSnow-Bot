import { Pool } from '../deps.ts';
import { botCache } from '../cache.ts';

export default class PostgreSQL {

    private static pool: Pool;

    public static async setupPool(): Promise<void> {
        this.pool = new Pool({
            user: botCache.config.database.user,
            password: botCache.config.database.password,
            database: botCache.config.database.database,
            hostname: botCache.config.database.hostname,
            port: botCache.config.database.port
        }, 20);
    }

    public static async runQuery(query: string, params?: any[]) {
        const client = await this.pool.connect();
        const result = !params ? await client.query(query) : await client.query(query, params);
        client.release();
        return result;
    }

}