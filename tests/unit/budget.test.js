const { isValidName, isValidAmount } = require("../../src/validation");

describe("Validation d'un budget", () => {
  test("un montant positif ou nul est valide", () => {
    expect(isValidAmount(0)).toBe(true);
    expect(isValidAmount(100)).toBe(true);
  });

  test("un montant négatif ou non numérique est invalide", () => {
    expect(isValidAmount(-50)).toBe(false);
    expect(isValidAmount("100")).toBe(false);
  });

  test("un nom vide est invalide", () => {
    expect(isValidName("")).toBe(false);
    expect(isValidName("  ")).toBe(false);
    expect(isValidName(undefined)).toBe(false);
    expect(isValidName("Courses")).toBe(true);
  });
});