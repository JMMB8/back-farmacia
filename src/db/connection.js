require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
 

});

pool
  .connect()
  .then(() => console.log("🔗 Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error al conectar a PostgreSQL", err));

module.exports = pool;
