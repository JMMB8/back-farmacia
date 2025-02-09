const pool = require("../db/connection.js");

const getCart = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, p.name, p.price, c.quantity, (p.price * c.quantity) AS total 
             FROM cart c 
             JOIN products p ON c.product_id = p.id 
             WHERE c.user_id = $1`,
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el carrito", error });
  }
};

const addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;

  try {
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      product_id,
    ]);
    if (product.rows.length === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    await pool.query(
      `INSERT INTO cart (user_id, product_id, quantity) 
             VALUES ($1, $2, $3) 
             ON CONFLICT (user_id, product_id) 
             DO UPDATE SET quantity = cart.quantity + $3`,
      [req.user.userId, product_id, quantity]
    );

    res.status(201).json({ message: "Producto agregado al carrito" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar al carrito", error });
  }
};

const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  try {
    const result = await pool.query(
      "UPDATE cart SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      [quantity, req.params.id, req.user.userId]
    );

    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });

    res.json({ message: "Cantidad actualizada", item: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el carrito", error });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM cart WHERE id = $1 AND user_id = $2 RETURNING *",
      [req.params.id, req.user.userId]
    );

    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });

    res.json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar del carrito", error });
  }
};

module.exports = { getCart, addToCart, updateCartItem, deleteCartItem };
