import pg from 'pg';

const Pool = pg.Pool



export const pool = new Pool({
    user: "postgres",
    password: process.env.PSQL_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "nivest"
});