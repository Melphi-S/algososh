import { CircleBorder } from "../circleBorderEnum";

describe("Queue page", () => {
  beforeEach(() => cy.visit("/queue"));

  it("should block add button while input is empty", function () {
    cy.get(`[data-testid="input"]`).should("have.value", "");
    cy.get(`[data-testid="add-button"]`).should("be.disabled");
  });

  it("should visualize an element adding in a queue correctly", function () {
    cy.get('[data-testid="input"]').type("1");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="circle-core"]').as("circle");

    cy.get('[data-testid="circle-core"]')
      .eq(0)
      .should("contain", "1")
      .and("have.css", "border", CircleBorder.Changing);
    cy.get('[data-testid="head"]').eq(0).should("contain", "head");
    cy.get('[data-testid="tail"]').eq(0).should("contain", "tail");
    cy.get('[data-testid="circle-core"]')
      .eq(0)
      .should("have.css", "border", CircleBorder.Default);

    cy.get('[data-testid="input"]').type("2");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="head"]').eq(0).should("contain", "head");
    cy.get('[data-testid="tail"]').eq(0).should("contain", "");

    cy.get('[data-testid="circle-core"]')
      .eq(1)
      .should("contain", "2")
      .and("have.css", "border", CircleBorder.Changing);
    cy.get('[data-testid="head"]').eq(1).should("contain", "");
    cy.get('[data-testid="tail"]').eq(1).should("contain", "tail");
    cy.get('[data-testid="circle-core"]')
      .eq(1)
      .should("have.css", "border", CircleBorder.Default);
  });

  it("should visualize an element deleting from a queue correctly", function () {
    cy.get('[data-testid="input"]').type("1");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="input"]').type("2");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="circle-core"]').as("circle");

    cy.get('[data-testid="delete-button"]').click();

    cy.get('[data-testid="circle-core"]')
      .eq(0)
      .should("have.css", "border", CircleBorder.Changing);

    cy.get('[data-testid="circle-core"]')
      .eq(0)
      .should("not.contain", "1")
      .and("have.css", "border", CircleBorder.Default);

    cy.get('[data-testid="head"]').eq(0).should("not.contain", "head");

    cy.get('[data-testid="head"]').eq(1).should("contain", "head");
  });

  it("should clear a queue", function () {
    cy.get('[data-testid="input"]').type("1");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="input"]').type("2");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="circle-core"]').as("circle");
    cy.get("@circle").each((circle, index) => {
      if (index === 0 || index === 1) {
        cy.wrap(circle).should("contain", `${index + 1}`);
      } else {
        cy.wrap(circle).within(() => {
          cy.get("p").should("be.empty");
        });
      }
    });

    cy.get('[data-testid="clear-button"]').click();

    cy.get("@circle").each((circle, index) => {
      cy.wrap(circle).within(() => {
        cy.get("p").should("be.empty");
      });
    });

    cy.get(`[data-testid="delete-button"]`).should("be.disabled");
    cy.get(`[data-testid="clear-button"]`).should("be.disabled");
  });
});
