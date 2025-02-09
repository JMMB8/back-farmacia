const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const cartRoutes = require("./routes/cartRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("", cartRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando correctamente");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`)
);
module.exports = app;
