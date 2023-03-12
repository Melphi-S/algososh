import { CircleBorder } from "../circleBorderEnum";

describe("List page", () => {
  beforeEach(() => cy.visit("/list"));

  it("should block the buttons while the inputs are empty", function () {
    cy.get(`[data-testid="value-input"]`).should("have.value", "");
    cy.get(`[data-testid="add-head-button"]`).should("be.disabled");
    cy.get(`[data-testid="add-tail-button"]`).should("be.disabled");
    cy.get(`[data-testid="add-index-button"]`).should("be.disabled");

    cy.get(`[data-testid="index-input"]`).should("have.value", "");
    cy.get(`[data-testid="delete-index-button"]`).should("be.disabled");
  });

  it("should render the default list correctly", function () {
    cy.get('[data-testid="circle-core"]').as("circle");

    cy.get("@circle").should("have.length", 4);
    cy.get("@circle").each((circle, index) => {
      if (index === 0) {
        cy.wrap(circle).should("contain", `H`);
      }
      if (index === 1) {
        cy.wrap(circle).should("contain", `O`);
      }
      if (index === 2) {
        cy.wrap(circle).should("contain", `L`);
      }
      if (index === 3) {
        cy.wrap(circle).should("contain", `A`);
      }
    });

    cy.get('[data-testid="head"]').as("head");
    cy.get("@head").each((head, index) => {
      if (index === 0) {
        cy.wrap(head).should("contain", `head`);
      } else {
        cy.wrap(head).should("be.empty");
      }
    });

    cy.get('[data-testid="tail"]').as("tail");
    cy.get("@tail").each((tail, index) => {
      if (index === 3) {
        cy.wrap(tail).should("contain", `tail`);
      } else {
        cy.wrap(tail).should("be.empty");
      }
    });
  });

  it("should visualize an element adding to a head correctly", function () {
    cy.get('[data-testid="value-input"]').type("1");
    cy.get('[data-testid="add-head-button"]').click();

    cy.get('[data-testid="circle-core"]').as("circle");

    cy.get("@circle").should("have.length", 5);
    cy.get('[data-testid="head"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="circle-core"]')
          .should("contain", "1")
          .and("have.css", "border", CircleBorder.Changing);
      });

    cy.get('[data-testid="circle-core"]')
      .eq(0)
      .should("have.css", "border", CircleBorder.Modified);

    cy.get('[data-testid="head"]').eq(0).should("contain", "head");

    cy.get('[data-testid="circle-core"]')
      .eq(0)
      .should("have.css", "border", CircleBorder.Default);
  });

  it("should visualize an element adding to a tail correctly", function () {
    cy.get('[data-testid="value-input"]').type("1");
    cy.get('[data-testid="add-tail-button"]').click();

    cy.get('[data-testid="circle-core"]').as("circle");

    cy.get("@circle").should("have.length", 6);

    cy.get('[data-testid="tail"]').eq(3).should("be.empty");

    cy.get('[data-testid="head"]')
      .eq(4)
      .within(() => {
        cy.get('[data-testid="circle-core"]')
          .should("contain", "1")
          .and("have.css", "border", CircleBorder.Changing);
      });

    cy.get("@circle").should("have.length", 5);

    cy.get('[data-testid="circle-core"]')
      .eq(4)
      .should("contain", "1")
      .and("have.css", "border", CircleBorder.Modified);

    cy.get('[data-testid="tail"]').eq(4).should("contain", "tail");
    cy.get('[data-testid="head"]').eq(4).should("be.empty");

    cy.get('[data-testid="circle-core"]')
      .eq(4)
      .should("have.css", "border", CircleBorder.Default);
  });

  it("should visualize an element adding by index correctly", function () {
    cy.get('[data-testid="value-input"]').type("1");
    cy.get('[data-testid="index-input"]').type("2");
    cy.get('[data-testid="add-index-button"]').click();

    cy.get('[data-testid="head"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="circle-core"]')
          .should("contain", "1")
          .and("have.css", "border", CircleBorder.Changing);
      });

    cy.get('[data-testid="head"]').eq(0).should("contain", "head");

    cy.get('[data-testid="circle-core"]')
      .eq(0)
      .should("have.css", "border", CircleBorder.Changing);

    cy.get('[data-testid="head"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="circle-core"]')
          .should("contain", "1")
          .and("have.css", "border", CircleBorder.Changing);
      });

    cy.get('[data-testid="head"]').eq(1).should("be.empty");

    cy.get('[data-testid="circle-core"]')
      .eq(1)
      .should("have.css", "border", CircleBorder.Changing);

    cy.get('[data-testid="head"]')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="circle-core"]')
          .should("contain", "1")
          .and("have.css", "border", CircleBorder.Changing);
      });

    cy.get('[data-testid="circle-core"]')
      .eq(2)
      .should("contain", "1")
      .and("have.css", "border", CircleBorder.Modified);

    cy.get('[data-testid="circle-core"]')
      .eq(2)
      .should("have.css", "border", CircleBorder.Default);

    cy.get('[data-testid="circle-core"]').as("circle");

    cy.get("@circle").should("have.length", 5);
  });

  it("should visualize an element deleting from head correctly", function () {
    cy.get('[data-testid="delete-head-button"]').click();

    cy.get('[data-testid="circle"]')
      .eq(0)
      .within(() => {
        cy.get("p").should("be.empty");
        cy.get('[data-testid="tail"]')
          .eq(0)
          .should("contain", "H")
          .within(() => {
            cy.get('[data-testid="circle-core"]').and(
              "have.css",
              "border",
              CircleBorder.Changing
            );
          });
      });

    cy.get('[data-testid="circle-core"]').as("circle");

    cy.get("@circle").should("have.length", 3);

    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("contain", "O")
      .within(() => {
        cy.get('[data-testid="head"]').should("contain", "head");
      });
  });

  it("should visualize an element deleting from tail correctly", function () {
    cy.get('[data-testid="delete-tail-button"]').click();

    cy.get('[data-testid="circle-core"]')
      .eq(0)
      .should("have.css", "border", CircleBorder.Changing);
    cy.get('[data-testid="circle-core"]')
      .eq(1)
      .should("have.css", "border", CircleBorder.Changing);
    cy.get('[data-testid="circle-core"]')
      .eq(2)
      .should("have.css", "border", CircleBorder.Changing);

    cy.get('[data-testid="circle"]')
      .eq(3)
      .within(() => {
        cy.get("p").should("be.empty");
        cy.get('[data-testid="tail"]')
          .eq(0)
          .should("contain", "A")
          .within(() => {
            cy.get('[data-testid="circle-core"]').and(
              "have.css",
              "border",
              CircleBorder.Changing
            );
          });
      });

    cy.get('[data-testid="circle-core"]').as("circle");

    cy.get("@circle").should("have.length", 3);

    cy.get('[data-testid="circle"]')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="tail"]').should("contain", "tail");
      });
  });

  it("should visualize an element deleting by index correctly", function () {
    cy.get('[data-testid="index-input"]').type("2");
    cy.get('[data-testid="delete-index-button"]').click();

    cy.get('[data-testid="circle-core"]')
      .eq(0)
      .should("have.css", "border", CircleBorder.Changing);
    cy.get('[data-testid="circle-core"]')
      .eq(1)
      .should("have.css", "border", CircleBorder.Changing);

    cy.get('[data-testid="circle"]')
      .eq(2)
      .within(() => {
        cy.get("p").should("be.empty");
        cy.get('[data-testid="tail"]')
          .eq(0)
          .should("contain", "L")
          .within(() => {
            cy.get('[data-testid="circle-core"]').and(
              "have.css",
              "border",
              CircleBorder.Changing
            );
          });
      });

    cy.get('[data-testid="circle-core"]').as("circle");

    cy.get("@circle").should("have.length", 3);

    cy.get('[data-testid="circle"]').eq(2).should("contain", "A");
  });
});
