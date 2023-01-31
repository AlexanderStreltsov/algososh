import {
  checkClassPresence,
  getListItemElement,
  getCircleElement,
  getCircleIndexElement,
  getCircleHeadElement,
} from "./utils";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { TOP } from "../../../src/constants/element-captions";

const checkAddToStack = (value: string) => {
  cy.get("input").type(value);
  cy.get('button[type="submit"]').click();

  cy.get("ul>li")
    .as("list")
    .each(($el, index, $list) => {
      getListItemElement($el);

      if (index === $list.length - 1) {
        getCircleElement().invoke("text").should("eq", value);
        getCircleHeadElement().invoke("text").should("eq", TOP);
        checkClassPresence("@circle", "circle_changing__");
      } else {
        getCircleHeadElement().invoke("text").should("eq", "");
        checkClassPresence("@circle", "circle_default__");
      }

      getCircleIndexElement().invoke("text").should("eq", `${index}`);
    });

  cy.wait(SHORT_DELAY_IN_MS);

  cy.get("@list").each(() => checkClassPresence("@circle", "circle_default__"));
};

const checkDeleteFromStack = () => {
  cy.get("ul>li")
    .as("list")
    .then(($list) => {
      const stackLength = $list.length;

      cy.get('button[type="button"]').contains("Удалить").click();

      cy.get("@list")
        .then(($list) => $list.get().reverse())
        .each(($el, index, $list) => {
          getListItemElement($el);
          getCircleElement();

          if (index === 0) {
            getCircleHeadElement().invoke("text").should("eq", TOP);
            checkClassPresence("@circle", "circle_changing__");
          } else {
            getCircleHeadElement().invoke("text").should("eq", "");
            checkClassPresence("@circle", "circle_default__");
          }

          getCircleIndexElement()
            .invoke("text")
            .should("eq", `${Math.abs(index - ($list.length - 1))}`);
        });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("@list")
        .should("have.length", stackLength - 1)
        .each(($el, index, $list) => {
          getListItemElement($el);
          getCircleElement();

          if (index === $list.length - 1) {
            getCircleHeadElement().invoke("text").should("eq", TOP);
          } else {
            getCircleHeadElement().invoke("text").should("eq", "");
          }

          getCircleIndexElement().invoke("text").should("eq", `${index}`);
          checkClassPresence("@circle", "circle_default__");
        });
    });
};

const checkClearStack = () => {
  cy.get("ul>li")
    .as("list")
    .then(() => {
      cy.get('button[type="reset"]').click();
      cy.get("@list").should("have.length", 0);
    });
};

export { checkAddToStack, checkDeleteFromStack, checkClearStack };
