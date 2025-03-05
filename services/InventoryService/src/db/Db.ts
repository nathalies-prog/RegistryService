import pg, { type Client, type Pool } from "pg";
let pool: null | Pool = null;
let client: null | Client = null;
export function getPool() {
  if (pool) {
    return pool;
  }
  pool = new pg.Pool({
    port: 5433,
    host: "localhost",
    user: "admin",
    password: "secret",
    database: "buecher",
  });

  return pool;
}

export function getClient() {
  if (client) {
    return client;
  }
  client = new pg.Client({
    port: 5433,
    host: "localhost",
    user: "admin",
    password: "secret",
    database: "buecher",
  });
  return client;
}
