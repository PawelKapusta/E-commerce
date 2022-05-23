describe("Renders the home screen", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders correctly", () => {
    cy.contains("Compiled with problems:").should("not.exist");
  });

  it("Main page", function () {
    cy.visit("/");
    cy.get(".MuiToolbar-root > img");
    cy.get('[data-testid="ShoppingBasketIcon"]');
    cy.contains("Home");
    cy.contains("Products");
    cy.contains("Login");
    cy.contains("Register");
    cy.get(".App > img");
  });

  it("Products screen", function () {
    cy.get('[href="/products"]').click();
    cy.url().should("include", "/products");
  });

  it("Basket screen", function () {
    cy.get('[href="/basket"]').click();
    cy.url().should("include", "/basket");
  });

  it("Login screen", function () {
    cy.get('[href="/login"]').click();
    cy.url().should("include", "/login");
  });

  it("Register screen", function () {
    cy.get('[href="/register"]').click();
    cy.url().should("include", "/register");
  });
});
