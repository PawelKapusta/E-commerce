describe("Renders the products screen", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders correctly", function () {
    cy.contains("Products").should("exist");
    cy.contains("Products").click();
    cy.url().should("include", "/products");
    cy.intercept('http://localhost:9090/api/v1/api/products').as('products')
  });
});
