const pool = require("../db/connection.js");
const format = require("pg-format");

const initDB = async () => {
  try {
    await pool.query("DROP TABLE IF EXISTS cart, products, users CASCADE");

    await pool.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                price DECIMAL(10,2) NOT NULL,
                image_url TEXT,
                stock INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE cart (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                product_id INT REFERENCES products(id) ON DELETE CASCADE,
                quantity INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    console.log("✅ Base de datos inicializada correctamente");

    // Insertar datos de prueba
    const users = [
      ["Juan Pérez", "juan@example.com", "$2b$10$hashedpassword"],
      ["Ana López", "ana@example.com", "$2b$10$hashedpassword"],
    ];

    const products = [
      [
        "Paracetamol",
        "Analgésico y antipirético",
        1500,
        "paracetamol.jpg",
        100,
      ],
      [
        "Ibuprofeno",
        "Antiinflamatorio no esteroideo",
        2500,
        "ibuprofeno.jpg",
        50,
      ],
    ];

    await pool.query(
      format("INSERT INTO users (name, email, password) VALUES %L", users)
    );
    await pool.query(
      format(
        "INSERT INTO products (name, description, price, image_url, stock) VALUES %L",
        products
      )
    );

    console.log("✅ Datos de prueba insertados");
  } catch (err) {
    console.error("❌ Error al inicializar la base de datos", err);
  } finally {
    pool.end();
  }
};

initDB();
