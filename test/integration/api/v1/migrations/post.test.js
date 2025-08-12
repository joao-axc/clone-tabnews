import database from "infra/database.js";

async function cleanSchemaDatabase() {
  await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;");
}

beforeAll(cleanSchemaDatabase);

const response = {};

describe("First POST api/v1/migrations:", () => {
  beforeAll(async () => {
    response.head = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });
    response.body = await response.head.json();
  });

  test("Should return status code '201'", () => {
    expect(response.head.status).toBe(201);
  });

  test("Should return array", () => {
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("this not to be blank", () => {
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("Second POST api/v1/migrations:", () => {
  beforeAll(async () => {
    response.head = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });
    response.body = await response.head.json();
  });

  test("Should return status code '200'", () => {
    expect(response.head.status).toBe(200);
  });

  test("Should return array", () => {
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("the array should return blank", () => {
    expect(response.body.length).toBe(0);
  });
});
