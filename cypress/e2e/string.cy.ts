import { CircleBorder } from "../circleBorderEnum";

describe("String page", () => {
  it("should block button while input is empty", function () {
    cy.visit("/recursion");
    cy.get(`[data-testid="input"]`).should("have.value", "");
    cy.get(`[data-testid="button"]`).should("be.disabled");
  });

  it("should visualize reverse algorithm correctly", function () {
    cy.visit("/recursion");
    cy.get('[data-testid="input"]').type("12345");
    cy.get('[data-testid="button"]').click();

    cy.get('[data-testid="circle-core"]').as("circle");

    cy.get("@circle")
      .should("have.length", 5)
      .each((circle, index) => {
        cy.wrap(circle)
          .should("contain", `${index + 1}`)
          .and("have.css", "border", CircleBorder.Default);
      });

    cy.get("@circle").each((circle, index) => {
      if (index === 0 || index === 4) {
        cy.wrap(circle).should("have.css", "border", CircleBorder.Changing);
      }
    });

    cy.get("@circle").each((circle, index) => {
      if (index === 0 || index === 4) {
        cy.wrap(circle).should("have.css", "border", CircleBorder.Modified);
      }
    });

    cy.get("@circle").each((circle, index) => {
      if (index === 0) {
        cy.wrap(circle).should("contain", "5");
      }
      if (index === 4) {
        cy.wrap(circle).should("contain", "1");
      }
    });

    cy.get("@circle").each((circle, index) => {
      if (index === 1 || index === 3) {
        cy.wrap(circle).should("have.css", "border", CircleBorder.Changing);
      }
    });

    cy.get("@circle").each((circle, index) => {
      if (index === 1 || index === 3) {
        cy.wrap(circle).should("have.css", "border", CircleBorder.Modified);
      }
    });

    cy.get("@circle").each((circle, index) => {
      if (index === 1) {
        cy.wrap(circle).should("contain", "4");
      }
      if (index === 3) {
        cy.wrap(circle).should("contain", "2");
      }
    });

    cy.get("@circle").each((circle, index) => {
      if (index === 2) {
        cy.wrap(circle).should("have.css", "border", CircleBorder.Changing);
      }
    });

    cy.get("@circle").each((circle, index) => {
      if (index === 2) {
        cy.wrap(circle).should("have.css", "border", CircleBorder.Modified);
      }
    });

    cy.get("@circle").each((circle, index) => {
      if (index === 2) {
        cy.wrap(circle).should("contain", "3");
      }
    });

    cy.get(`[data-testid="input"]`).should("have.value", "");
    cy.get(`[data-testid="button"]`).should("be.disabled");
  });
});
