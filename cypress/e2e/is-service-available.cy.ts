describe("service is available", () => {
  it("should be available on http://localhost:3000", () => {
    cy.visit("/");
    cy.title().should("eq", "МБОУ АЛГОСОШ");
  });
});
