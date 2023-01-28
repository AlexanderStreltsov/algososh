import {
  checkClassPresence,
  getListItemElement,
  getCircleElement,
  getCircleIndexElement,
  getCircleHeadElement,
  getCircleTailElement,
} from "./utils";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { HEAD, TAIL } from "../../../src/constants/element-captions";

const checkAddToQueue = (
  value: string,
  headIndex: number,
  tailIndex: number
) => {
  cy.get("input").type(value);
  cy.get('button[type="submit"]').click();

  cy.get("ul>li")
    .as("list")
    .each(($el, index) => {
      getListItemElement($el);
      getCircleElement();

      if (index === tailIndex) {
        checkClassPresence("@circle", "circle_changing__");
      } else {
        checkClassPresence("@circle", "circle_default__");
      }
    });

  cy.wait(SHORT_DELAY_IN_MS);

  cy.get("@list").each(($el, index) => {
    getListItemElement($el);

    if (index === tailIndex && index === headIndex) {
      getCircleElement().invoke("text").should("eq", value);
      getCircleHeadElement().invoke("text").should("eq", HEAD);
      getCircleTailElement().invoke("text").should("eq", TAIL);
      checkClassPresence("@circle", "circle_changing__");
    } else if (index === tailIndex) {
      getCircleElement().invoke("text").should("eq", value);
      getCircleHeadElement().invoke("text").should("eq", "");
      getCircleTailElement().invoke("text").should("eq", TAIL);
      checkClassPresence("@circle", "circle_changing__");
    } else if (index === headIndex) {
      getCircleElement();
      getCircleHeadElement().invoke("text").should("eq", HEAD);
      getCircleTailElement().invoke("text").should("eq", "");
      checkClassPresence("@circle", "circle_default__");
    } else {
      getCircleElement();
      getCircleHeadElement().invoke("text").should("eq", "");
      getCircleTailElement().invoke("text").should("eq", "");
      checkClassPresence("@circle", "circle_default__");
    }

    getCircleIndexElement().invoke("text").should("eq", `${index}`);
  });

  cy.wait(SHORT_DELAY_IN_MS);

  cy.get("@list").each(($el) => {
    getListItemElement($el);
    getCircleElement();
    checkClassPresence("@circle", "circle_default__");
  });
};

const checkDeleteFromQueue = (headIndex: number, tailIndex: number) => {
  cy.get('button[type="button"]').contains("Удалить").click();

  cy.get("ul>li")
    .as("list")
    .each(($el, index) => {
      getListItemElement($el);
      getCircleElement();

      if (index === headIndex && index === tailIndex) {
        getCircleHeadElement().invoke("text").should("eq", HEAD);
        getCircleTailElement().invoke("text").should("eq", TAIL);
        checkClassPresence("@circle", "circle_changing__");
      } else if (index === headIndex) {
        getCircleHeadElement().invoke("text").should("eq", HEAD);
        getCircleTailElement().invoke("text").should("eq", "");
        checkClassPresence("@circle", "circle_changing__");
      } else if (index === tailIndex) {
        getCircleHeadElement().invoke("text").should("eq", "");
        getCircleTailElement().invoke("text").should("eq", TAIL);
        checkClassPresence("@circle", "circle_default__");
      } else {
        getCircleHeadElement().invoke("text").should("eq", "");
        getCircleTailElement().invoke("text").should("eq", "");
        checkClassPresence("@circle", "circle_default__");
      }

      getCircleIndexElement().invoke("text").should("eq", `${index}`);
    });

  cy.wait(SHORT_DELAY_IN_MS);

  cy.get("@list").each(($el, index) => {
    getListItemElement($el);
    getCircleElement();

    if (headIndex == tailIndex) {
      getCircleElement().invoke("text").should("eq", "");
      getCircleHeadElement().invoke("text").should("eq", "");
      getCircleTailElement().invoke("text").should("eq", "");
    } else {
      if (index === headIndex) {
        getCircleElement().invoke("text").should("eq", "");
        getCircleHeadElement().invoke("text").should("eq", "");
        getCircleTailElement().invoke("text").should("eq", "");
      } else if (index === headIndex + 1 && index === tailIndex) {
        getCircleHeadElement().invoke("text").should("eq", HEAD);
        getCircleTailElement().invoke("text").should("eq", TAIL);
      } else if (index === headIndex + 1) {
        getCircleHeadElement().invoke("text").should("eq", HEAD);
        getCircleTailElement().invoke("text").should("eq", "");
      } else if (index === tailIndex) {
        getCircleHeadElement().invoke("text").should("eq", "");
        getCircleTailElement().invoke("text").should("eq", TAIL);
      } else {
        getCircleHeadElement().invoke("text").should("eq", "");
        getCircleTailElement().invoke("text").should("eq", "");
      }
    }

    checkClassPresence("@circle", "circle_default__");
    getCircleIndexElement().invoke("text").should("eq", `${index}`);
  });
};

const checkClearQueue = () => {
  cy.get('button[type="reset"]').click();

  cy.get("ul>li").each(($el, index) => {
    getListItemElement($el);
    getCircleElement().invoke("text").should("eq", "");
    getCircleHeadElement().invoke("text").should("eq", "");
    getCircleTailElement().invoke("text").should("eq", "");
    checkClassPresence("@circle", "circle_default__");
    getCircleIndexElement().invoke("text").should("eq", `${index}`);
  });
};

export { checkAddToQueue, checkDeleteFromQueue, checkClearQueue };
