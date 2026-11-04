const request = require("supertest");
const app = require("../../src/app");

describe("API Budget", () => {
  test("GET /health → 200", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  test("GET /api/budgets → liste vide initiale", async () => {
    const res = await request(app).get("/api/budgets");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/budgets → crée un budget", async () => {
    const res = await request(app)
        .post("/api/budgets")
        .send({ name: "Alimentation", amount: 300 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: "Alimentation", amount: 300 });
    expect(res.body.id).toBeDefined();
  });

  test("POST /api/budgets sans name → 400", async () => {
    const res = await request(app).post("/api/budgets").send({ amount: 100 });
    expect(res.status).toBe(400);
  });

  test("GET /api/budgets/:id inexistant → 404", async () => {
    const res = await request(app).get("/api/budgets/99999");
    expect(res.status).toBe(404);
  });
});