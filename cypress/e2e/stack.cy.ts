import { CircleBorder } from "../circleBorderEnum";

describe("Stack page", () => {
  beforeEach(() => cy.visit("/stack"));

  it("should block add button while input is empty", function () {
    cy.get(`[data-testid="input"]`).should("have.value", "");
    cy.get(`[data-testid="add-button"]`).should("be.disabled");
  });

  it("should visualize adding an element in a stack correctly", function () {
    cy.get('[data-testid="input"]').type("1");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="circle-core"]').as("circle");

    cy.get("@circle").should("have.length", 1);
    cy.get('[data-testid="circle-core"]')
      .eq(0)
      .should("contain", "1")
      .and("have.css", "border", CircleBorder.Changing);
    cy.get('[data-testid="head"]').eq(0).should("contain", "top");
    cy.get('[data-testid="index"]').eq(0).should("contain", "0");
    cy.get('[data-testid="circle-core"]')
      .eq(0)
      .should("have.css", "border", CircleBorder.Default);

    cy.get('[data-testid="input"]').type("2");
    cy.get('[data-testid="add-button"]').click();

    cy.get("@circle").should("have.length", 2);
    cy.get('[data-testid="head"]').eq(0).should("not.contain", "top");
    cy.get('[data-testid="head"]').eq(1).should("contain", "top");
    cy.get('[data-testid="index"]').eq(1).should("contain", "1");
  });

  it("should visualize deleting an element from a stack correctly", function () {
    cy.get('[data-testid="input"]').type("1");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="circle-core"]').as("circle");
    cy.get("@circle").should("have.length", 1);

    cy.get('[data-testid="delete-button"]').click();

    cy.get('[data-testid="circle-core"]')
      .eq(0)
      .should("have.css", "border", CircleBorder.Changing);

    cy.get("@circle").should("have.length", 0);
  });

  it("should clear a stack", function () {
    cy.get('[data-testid="input"]').type("1");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="input"]').type("2");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="circle-core"]').as("circle");
    cy.get("@circle").should("have.length", 2);

    cy.get('[data-testid="clear-button"]').click();

    cy.get("@circle").should("have.length", 0);
    cy.get(`[data-testid="delete-button"]`).should("be.disabled");
    cy.get(`[data-testid="clear-button"]`).should("be.disabled");
  });
});
