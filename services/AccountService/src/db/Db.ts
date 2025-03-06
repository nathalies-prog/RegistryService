import pg, { type Client, type Pool } from 'pg';
let pool: null | Pool = null;
export function getPool() {
  if (pool) {
    return pool;
  }
  pool = new pg.Pool({
    port:5433,
    host: 'localhost',
    user: "user",
    password: "password",
    database: "postgres",
  });

  return pool;
}
