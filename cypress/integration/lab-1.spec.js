const baseURL = "./solution/index.html";

const config = {
  failureThreshold: 1 / 100, // %
  customDiffConfig: { threshold: 0.1 },
  failureThresholdType: "percent",
  allowSizeMismatch: true
};

describe("Lab-1", () => {
  it("match screenshot on 1280x720", () => {
    cy.viewport(1280, 720);
    cy.visit(baseURL);
    cy.screenshot('Lab-1-1280x720-screenshot');
    cy.matchImageSnapshot('Lab-1-1280x720', config);
  });

  it("match screenshot on 1024x576", () => {
    cy.viewport(1024, 576);
    cy.visit(baseURL);
    cy.screenshot('Lab-1-1024x576-screenshot');
    cy.matchImageSnapshot('Lab-1-1024x576', config);
  });
});
