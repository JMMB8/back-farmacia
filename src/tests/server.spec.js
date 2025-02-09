const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de products", () => {
  it("obteniendo un status 200 y tipo de datos", async () => {
    const { statusCode, body } = await request(server).get("/products").send();

    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
  });
});

it("Eliminar un producto con un id que no existe: delete 404", async () => {
  const jwt = "Bearer token";
  const id = 999;
  const response = await request(server)
    .delete(`/products/${id}`)
    .set("Authorization", jwt)
    .send();
  expect(response.statusCode).toBe(404);
});
it("Agregando un nuevo producto: POST 201", async () => {
  const id = Math.floor(Math.random() * 999);
  const producto = {
    id,
    name: "producto nuevo",
    description: "descripcion del producto",
    price: 100,
    image_url: "https://example.com/image.jpg",
    stock: 10,
  };
  const { body: productoCreado, statusCode } = await request(server)
    .post("/products")
    .send(producto);
  expect(statusCode).toBe(201);
  expect(productoCreado).toHaveProperty("id");
  expect(productoCreado.name).toBe(producto.name);
});

it("actualizar un producto con id diferente: PUT 404", async () => {
  const id = 999;
  const productoPayload = { id, nombre: "producto nuevo" };
  const { body: productoCreado, statusCode } = await request(server)
    .put("/products/1")
    .send(productoPayload);
  expect(statusCode).toBe(404);
});
