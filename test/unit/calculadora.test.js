const { somar } = require("../../models/calculadora.js");

describe("calculadora", () => {
  test("soma da calculadora", () => {
    const result = somar(2, 3);
    expect(result).toBe(5);
  });
  test("se o typeof está correto", () => {
    const result = somar("string", 2);
    expect(result).toBe("Erro");
  });
});
