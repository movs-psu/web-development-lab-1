const baseURL = "./solution/index.html";

const matchPercentConfig = (percent) => ({
  failureThreshold: percent / 100, // %
  customDiffConfig: { threshold: 0.5 },
  failureThresholdType: "percent",
  allowSizeMismatch: true
});

// > 10% - всё очень плохо, нет одного сообщения, или нет меню
// 10% --- В целом зачтено
// 8.4% - нет аватарок
// 5% - куча косяков с размерами
// 1.28..1.6% - мелкая проблема с колонками, например 87% вместо 1/6
// 0.48% - отсутствует активная ссылка в главном меню
// 0.18..0.26% - неверная колонка только в навбаре
// 0.08% --- Зачтено полностью
// 0.05..0.07% - Arial вместо Open Sans + тень 2px вокруг всего текста (на самом деле поехала из-за смены шрифта кнопка)
// 0.038% - невидимые аватарки
// 0.02% --- Зачтено полностью
// 0.01% - запас
// 0.0066..0.0094% - адская тень у шрифта, всё ужасно двоится

describe("Lab-1", () => {
  it("(3б) Страница в целом соответствует эскизу на 1280x720 с точностью более 90%", () => {
    cy.viewport(1280, 720);
    cy.visit(baseURL);
    cy.screenshot("Lab-1-1280x720-simple-screenshot");
    cy.matchImageSnapshot("Lab-1-1280x720", matchPercentConfig(10));
  });

  it("(3б) Страница соответствует эскизу на 1280x720 с точностью более 99.98%", () => {
    cy.viewport(1280, 720);
    cy.visit(baseURL);
    cy.screenshot("Lab-1-1280x720-screenshot");
    cy.matchImageSnapshot("Lab-1-1280x720", matchPercentConfig(0.02)); //0.08%
  });

  it("(2б) Страница соответствует эскизу на 1024x576 с точностью более 99.98%", () => {
    cy.viewport(1024, 576);
    cy.visit(baseURL);
    cy.screenshot("Lab-1-1024x576-screenshot");
    cy.matchImageSnapshot("Lab-1-1024x576", matchPercentConfig(0.02));
  });

  it("(1б) Использованы семантические теги (nav, main, footer, article, ul, h1, time); присутствуют ссылки <a href=\"#\">: Письма, Написать, @username, Выход, Непрочитанные, Входящие, Отправленные", () => {
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

