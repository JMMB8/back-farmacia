require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "5411747",
  database: "farmaciabdd",
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
});

pool
  .connect()
  .then(() => console.log("🔗 Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error al conectar a PostgreSQL", err));

module.exports = pool;
