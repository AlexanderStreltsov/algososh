import {
  checkClassPresence,
  getListItemElement,
  getCircleElement,
  getCircleIndexElement,
} from "./utils";
import { DELAY_IN_MS } from "../../../src/constants/delays";

const checkRenderCircleList = (maxIndex: number, fibonacciArr: number[]) => {
  cy.get("input").type(`${maxIndex}`);
  cy.get('button[type="submit"]').click();

  let i = 0;
  while (true) {
    cy.get("ul>li").each(($el, index) => {
      getListItemElement($el);
      getCircleElement().invoke("text").should("eq", `${fibonacciArr[index]}`);
      getCircleIndexElement().invoke("text").should("eq", `${index}`);
      checkClassPresence("@circle", "circle_default__");
    });

    i++;
    if (i > maxIndex) break;
    cy.wait(DELAY_IN_MS);
  }
};

export { checkRenderCircleList };
