describe("Login tests", function () {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders correctly", function () {
    cy.contains("Login").should("exist");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get(".makeStyles-login-7").contains("Login").should("exist");
    cy.contains("You don't have an account? Please register here").should("exist");
  });

  it("Empty data test", function () {
    cy.contains("Login").should("exist");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get(".makeStyles-login-7").contains("Login").should("exist").click();
    assert(cy.contains("Username is a required field"));
    assert(cy.contains("Password is a required field"));
    cy.contains("Login").should("exist");
  });

  it("Missing password data", function () {
    cy.contains("Login").should("exist");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get("input[name=username]").type("test");
    cy.get(".makeStyles-login-7").contains("Login").should("exist").click();
    assert(cy.contains("Password is a required field"));
  });

  it("Missing username data", function () {
    cy.contains("Login").should("exist");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get("input[name=password]").type("test");
    cy.get(".makeStyles-login-7").contains("Login").should("exist").click();
    assert(cy.contains("Username is a required field"));
  });

  it("link to register page", function () {
    cy.contains("Login").should("exist");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.contains("You don't have an account? Please register here").should("exist").click();
    cy.url().should("include", "/register");
  });

  it("Not visible password", function () {
    cy.contains("Login").should("exist");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get("input[name=password]").type("test").get("[type='password']");

  });

  it("Visible password", function () {
    cy.contains("Login").should("exist");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get('.MuiInputAdornment-positionEnd > .MuiButtonBase-root').click();
    cy.get("input[name=password]").type("test").get("[type='text']");
  });

});
