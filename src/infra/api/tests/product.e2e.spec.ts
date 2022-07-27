import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const type = "a";
    const name = "John";
    const price = 2.1;

    const response = await request(app).post("/product").send({
      type,
      name,
      price,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(name);
    expect(response.body.price).toBe(price);
  });

  it("should not create a product", async () => {
    const name = "John";
    const response = await request(app).post("/product").send({
      name,
    });

    expect(response.status).toBe(400);
  });

  // it("should list all products", async () => {
  //   const name1 = "John";
  //   const name2 = "Jane";
  //   const price = {
  //     street: "Street",
  //     city: "City",
  //     number: 123,
  //     zip: "12345",
  //   };

  //   const response1 = await request(app).post("/product").send({
  //     name: name1,
  //     price,
  //   });
  //   const response2 = await request(app).post("/product").send({
  //     name: name2,
  //     price,
  //   });

  //   expect(response1.status).toBe(200);
  //   expect(response2.status).toBe(200);

  //   const listResponse = await request(app).get("/product").send();

  //   expect(listResponse.status).toBe(200);
  //   expect(listResponse.body.products.length).toBe(2);

  //   const product1 = listResponse.body.products[0];
  //   const product2 = listResponse.body.products[1];

  //   expect(product1.name).toBe(name1);
  //   expect(product2.name).toBe(name2);
  //   expect(product1.price.street).toBe(price.street);
  //   expect(product2.price.street).toBe(price.street);
  // });
});
