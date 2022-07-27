import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const name = "John";
    const address = {
      street: "Street",
      city: "City",
      number: 123,
      zip: "12345",
    };

    const response = await request(app).post("/customer").send({
      name,
      address,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(name);
    expect(response.body.address.street).toBe(address.street);
    expect(response.body.address.city).toBe(address.city);
    expect(response.body.address.number).toBe(address.number);
    expect(response.body.address.zip).toBe(address.zip);
  });

  it("should not create a customer", async () => {
    const name = "John";
    const response = await request(app).post("/customer").send({
      name,
    });

    expect(response.status).toBe(400);
  });

  it("should list all customers", async () => {
    const name1 = "John";
    const name2 = "Jane";
    const address = {
      street: "Street",
      city: "City",
      number: 123,
      zip: "12345",
    };

    const response1 = await request(app).post("/customer").send({
      name: name1,
      address,
    });
    const response2 = await request(app).post("/customer").send({
      name: name2,
      address,
    });

    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/customer").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    const customer1 = listResponse.body.customers[0];
    const customer2 = listResponse.body.customers[1];
    
    expect(customer1.name).toBe(name1);
    expect(customer2.name).toBe(name2);
    expect(customer1.address.street).toBe(address.street);
    expect(customer2.address.street).toBe(address.street);
  });
});
