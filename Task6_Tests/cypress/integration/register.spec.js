describe("Register tests", function () {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders correctly", function () {
    cy.contains("Register").should("exist");
    cy.contains("Register").click();
    cy.url().should("include", "/register");
    cy.get(".makeStyles-register-6").contains("Register").should("exist");
    cy.contains("You have already an account?").should("exist");
  });

  it("Empty data test", function () {
    cy.contains("Register").should("exist");
    cy.contains("Register").click();
    cy.url().should("include", "/register");
    cy.get(".makeStyles-register-6").contains("Register").should("exist").click();
    assert(cy.contains("Name is a required field"));
    assert(cy.contains("Surname is a required field"));
    assert(cy.contains("Username is a required field"));
    assert(cy.contains("Email is a required field"));
    assert(cy.contains("Password is a required field"));
    assert(cy.contains("Confirmed password is a required field"));
    cy.contains("Register").should("exist");
  });

  it("Different password and confirmed password", function () {
    cy.contains("Register").should("exist");
    cy.contains("Register").click();
    cy.url().should("include", "/register");
    cy.get("input[name=name]").type("Paweł");
    cy.get("input[name=surname]").type("Kapusta");
    cy.get("input[name=username]").type("Sony");
    cy.get("input[name=email]").type("pawel@sony");
    cy.get("input[name=password]").type("test1234");
    cy.get("input[name=confirmPassword]").type("ttttttt");
    cy.get(".makeStyles-register-6").contains("Register").should("exist").click();
    assert(cy.contains("Passwords must be the same"));
  });

  it("Link to login page", function () {
    cy.contains("Register").should("exist");
    cy.contains("Register").click();
    cy.url().should("include", "/register");
    cy.contains("You have already an account?").should("exist").click();
    cy.url().should("include", "/login");
  });

  it("Not visible passwords", function () {
    cy.contains("Register").should("exist");
    cy.contains("Register").click();
    cy.url().should("include", "/register");
    cy.get("input[name=password]").type("test").get("[type='password']");
    cy.get("input[name=confirmPassword]").type("test").get("[type='password']");
  });

  it("Visible passwords", function () {
    cy.contains("Register").should("exist");
    cy.contains("Register").click();
    cy.url().should("include", "/register");
    cy.get(':nth-child(14) > .MuiFilledInput-root > .MuiInputAdornment-positionEnd > .MuiButtonBase-root').click();
    cy.get(':nth-child(17) > .MuiFilledInput-root > .MuiInputAdornment-positionEnd > .MuiButtonBase-root').click();
    cy.get("input[name=password]").type("test").get("[type='password']");
    cy.get("input[name=confirmPassword]").type("test").get("[type='text']");
  });

});
