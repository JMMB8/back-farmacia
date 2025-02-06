const pool = require("../db/connection");

const getProducts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos", error });
    }
};

const getProductById = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Producto no encontrado" });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, image_url, stock } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO products (name, description, price, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, description, price, image_url, stock]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al crear producto", error });
    }
};

const updateProduct = async (req, res) => {
    const { name, description, price, image_url, stock } = req.body;

    try {
        const result = await pool.query(
            "UPDATE products SET name = $1, description = $2, price = $3, image_url = $4, stock = $5 WHERE id = $6 RETURNING *",
            [name, description, price, image_url, stock, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: "Producto no encontrado" });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar producto", error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Producto no encontrado" });

        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
