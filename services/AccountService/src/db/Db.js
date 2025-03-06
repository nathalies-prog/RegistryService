"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPool = getPool;
const pg_1 = __importDefault(require("pg"));
let pool = null;
function getPool() {
    if (pool) {
        return pool;
    }
    pool = new pg_1.default.Pool({
        port: 5432,
        host: "localhost",
        user: "admin",
        password: "secret",
        database: "postgres",
    });
    return pool;
}
