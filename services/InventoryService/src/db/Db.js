"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPool = getPool;
exports.getClient = getClient;
const pg_1 = __importDefault(require("pg"));
let pool = null;
let client = null;
function getPool() {
    if (pool) {
        return pool;
    }
    pool = new pg_1.default.Pool({
        port: 5433,
        host: "localhost",
        user: "admin",
        password: "secret",
        database: "buecher",
    });
    return pool;
}
function getClient() {
    if (client) {
        return client;
    }
    client = new pg_1.default.Client({
        port: 5433,
        host: "localhost",
        user: "admin",
        password: "secret",
        database: "buecher",
    });
    return client;
}
