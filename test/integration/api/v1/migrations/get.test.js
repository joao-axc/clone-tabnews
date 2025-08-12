import database from "infra/database.js";

async function cleanSchemaDatabase() {
  await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;");
}

beforeAll(cleanSchemaDatabase);

const response = {};

beforeAll(async () => {
  response.head = await fetch("http://localhost:3000/api/v1/migrations");
  response.body = await response.head.json();
});

describe("GET api/v1/migrations:", () => {
  test("should return status code '200'", () => {
    expect(response.head.status).toBe(200);
  });

  test("must be an array", () => {
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("this not to be blank", () => {
    expect(response.body.length).toBeGreaterThan(0);
  });
});
