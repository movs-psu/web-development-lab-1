const baseURL = "./solution/index.html";

const matchPercentConfig = (percent) => ({
  failureThreshold: percent / 100, // %
  customDiffConfig: { threshold: 0.01 },
  failureThresholdType: "percent",
  allowSizeMismatch: true
});

describe("Lab-1", () => {
  it("(3б) Страница в целом соответствует эскизу на 1280x720 с точностью более 90%", () => {
    cy.viewport(1280, 720);
    cy.visit(baseURL);
    cy.screenshot("Lab-1-1280x720-simple-screenshot");
    cy.matchImageSnapshot("Lab-1-1280x720", matchPercentConfig(10));
  });

  it("(3б) Страница соответствует эскизу на 1280x720 с точностью более 99.9%", () => {
    cy.viewport(1280, 720);
    cy.visit(baseURL);
    cy.screenshot("Lab-1-1280x720-screenshot");
    cy.matchImageSnapshot("Lab-1-1280x720", matchPercentConfig(0.1));
  });

  it("(2б) Страница соответствует эскизу на 1024x576 с точностью более 99.9%", () => {
    cy.viewport(1024, 576);
    cy.visit(baseURL);
    cy.screenshot("Lab-1-1024x576-screenshot");
    cy.matchImageSnapshot("Lab-1-1024x576", matchPercentConfig(0.1));
  });

  it("(1б) Использованы семантические теги (nav, main, footer, article, ul, h1, time)\n присутствуют ссылки <a href=\"#\">: Письма, Написать, @username, Выход, Непрочитанные, Входящие, Отправленные", () => {
    cy.visit(baseURL);
    cy.get("nav");
    cy.get("main");
    cy.get("footer");
    cy.get("article");
    cy.get("ul");
    cy.get("h1");

    const dates = [
      ["2020-08-28", "28.08.2020"],
      ["2020-08-28", "28.08.2020"],
      ["2020-08-26", "26.08.2020"]
    ];
    cy.get("time").each(($time, index) => {
      cy.wrap($time)
        .should("have.attr", "datetime", dates[index][0])
        .should("have.text", dates[index][1]);
    });

    const links = ["Письма", "Написать", "@username", "Выход", "Непрочитанные", "Входящие", "Отправленные"];
    cy.get("a").each(($a, index) => {
      cy.wrap($a)
        .should("have.text", links[index])
        .should("have.attr", "href", "#");
    });
  });
});

