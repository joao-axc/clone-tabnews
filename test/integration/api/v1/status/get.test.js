const response = {};

beforeAll(async () => {
  response.head = await fetch("http://localhost:3000/api/v1/status");
  response.body = await response.head.json();
});

describe("GET api/v1/status:", () => {
  test("Should return status code '200'", () => {
    expect(response.head.status).toBe(200);
  });

  describe("Related to updatedAt:", () => {
    test("it was defined", () => {
      expect(response.body.updated_at).toBeDefined();
    });

    test("it is a date", () => {
      const parsedUpdatedAt = new Date(response.body.updated_at).toISOString();
      expect(response.body.updated_at).toEqual(parsedUpdatedAt);
    });
  });

  describe("Related to dependencies:", () => {
    describe("to database:", () => {
      test("check the version", () => {
        expect(response.body.dependencies.database.version).toEqual("16.0");
      });
      test("check the max connections", () => {
        expect(response.body.dependencies.database.max_connections).toEqual(
          100
        );
      });
      test("check opened connections", () => {
        expect(response.body.dependencies.database.opened_connections).toEqual(
          1
        );
      });
    });
  });
});
