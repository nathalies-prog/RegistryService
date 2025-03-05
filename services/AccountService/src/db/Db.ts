import pg, { type Client, type Pool } from 'pg';
let pool: null | Pool = null;
export function getPool() {
  if (pool) {
    return pool;
  }
  pool = new pg.Pool({
    port:5432,
    host: "localhost",
    user: "admin",
    password: "secret",
    database: "postgres",
  });

  return pool;
}
