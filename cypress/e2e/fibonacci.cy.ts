describe("Fibonacci page", () => {
  it("should block button while input is empty", function () {
    cy.visit("/fibonacci");
    cy.get(`[data-testid="input"]`).should("have.value", "");
    cy.get(`[data-testid="button"]`).should("be.disabled");
  });

  it("should block button while input is empty", function () {
    cy.visit("/fibonacci");
    cy.get('[data-testid="input"]').type("7");
    cy.get('[data-testid="button"]').click();

    cy.get('[data-testid="circle-core"]').as("circle");

    cy.get("@circle").should("have.length", 1);
    cy.get('[data-testid="circle-core"]').eq(0).should("contain", "0");

    cy.get("@circle").should("have.length", 2);
    cy.get('[data-testid="circle-core"]').eq(1).should("contain", "1");

    cy.get("@circle").should("have.length", 3);
    cy.get('[data-testid="circle-core"]').eq(2).should("contain", "1");

    cy.get("@circle").should("have.length", 4);
    cy.get('[data-testid="circle-core"]').eq(3).should("contain", "2");

    cy.get("@circle").should("have.length", 5);
    cy.get('[data-testid="circle-core"]').eq(4).should("contain", "3");

    cy.get("@circle").should("have.length", 6);
    cy.get('[data-testid="circle-core"]').eq(5).should("contain", "5");

    cy.get("@circle").should("have.length", 7);
    cy.get('[data-testid="circle-core"]').eq(6).should("contain", "8");

    cy.get("@circle").should("have.length", 8);
    cy.get('[data-testid="circle-core"]').eq(7).should("contain", "13");
  });
});
