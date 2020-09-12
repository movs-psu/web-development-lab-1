const baseURL = "./solution/index.html";

const config = {
  failureThreshold: 1 / 100, // %
  customDiffConfig: { threshold: 0.1 },
  failureThresholdType: "percent",
  allowSizeMismatch: true
};

describe("Lab-1", () => {
  it("должны быть ссылки <a href=\"#\">: Письма, Написать, @username, Выход, Непрочитанные, Входящие, Отправленные", () => {
    cy.visit(baseURL);
    const links = ["Письма", "Написать", "@username", "Выход", "Непрочитанные", "Входящие", "Отправленные"];
    cy.get("a").each(($a, index) => {
      cy.wrap($a)
        .should("have.text", links[index])
        .should("have.attr", "href", "#");
    });
  });

  it("должны быть семантические теги: <nav>, <main>, <footer>, <article>, <ul>, <h1>", () => {
    cy.visit(baseURL);
    cy.get("nav");
    cy.get("main");
    cy.get("footer");
    cy.get("article");
    cy.get("ul");
    cy.get("h1");
  });

  it("должны быть элементы <time> для дат", () => {
    cy.visit(baseURL);
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
  });

  it("должно соответствовать эталону с точностью > 99% на 1280x720", () => {
    cy.viewport(1280, 720);
    cy.visit(baseURL);
    cy.screenshot("Lab-1-1280x720-screenshot");
    cy.matchImageSnapshot("Lab-1-1280x720", config);
  });

  it("должно соответствовать эталону с точностью > 99% на 1024x576", () => {
    cy.viewport(1024, 576);
    cy.visit(baseURL);
    cy.screenshot("Lab-1-1024x576-screenshot");
    cy.matchImageSnapshot("Lab-1-1024x576", config);
  });
});

