import {
  checkClassPresence,
  getListItemElement,
  getCircleElement,
  isButtonDisabledWithEmptyInput,
  type IButton,
} from "./utils/utils";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe("check reverse string functionality is correctly", () => {
  beforeEach(() => cy.visit("/recursion"));

  it("should be add button is disabled if input is empty", () => {
    const buttons: IButton[] = [{ type: "submit", text: "Развернуть" }];
    isButtonDisabledWithEmptyInput("string", buttons);
  });

  it("should be correctly render reverse", () => {
    const initStr = "hello";
    const middleStr = "oellh";
    const finalStr = "olleh";

    cy.get("input").type(initStr);
    cy.get('button[type="submit"]').click();

    cy.get("ul>li")
      .as("list")
      .should("have.text", initStr)
      .each(($el, index) => {
        getListItemElement($el);
        getCircleElement();
        if ([0, initStr.length - 1].includes(index)) {
          checkClassPresence("@circle", "circle_changing__");
        } else {
          checkClassPresence("@circle", "circle_default__");
        }
      });

    cy.wait(DELAY_IN_MS);

    cy.get("@list")
      .should("have.text", middleStr)
      .each(($el, index) => {
        getListItemElement($el);
        getCircleElement();
        if ([0, middleStr.length - 1].includes(index)) {
          checkClassPresence("@circle", "circle_modified__");
        } else if ([1, middleStr.length - 2].includes(index)) {
          checkClassPresence("@circle", "circle_changing__");
        } else {
          checkClassPresence("@circle", "circle_default__");
        }
      });

    cy.wait(DELAY_IN_MS);

    cy.get("@list")
      .should("have.text", finalStr)
      .each(($el, index) => {
        getListItemElement($el);
        getCircleElement();
        if (index === 2) {
          checkClassPresence("@circle", "circle_changing__");
        } else {
          checkClassPresence("@circle", "circle_modified__");
        }
      });

    cy.wait(DELAY_IN_MS);

    cy.get("@list")
      .should("have.text", finalStr)
      .each(($el) => {
        getListItemElement($el);
        getCircleElement();
        checkClassPresence("@circle", "circle_modified__");
      });
  });
});
