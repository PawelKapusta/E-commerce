describe("Renders the basket screen", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders correctly", function () {
    cy.get('[data-testid="ShoppingBasketIcon"]').should("exist");
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.url().should("include", "/basket");
  });

  it("Empty basket", function () {
    cy.get('[data-testid="ShoppingBasketIcon"]').should("exist");
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.url().should("include", "/basket");
    cy.get('.MuiTypography-h3').contains("Basket");
    cy.get('.MuiTypography-h5').contains("No items here");
  });

});
