import {
  checkClassPresence,
  getListItemElement,
  getCircleElement,
  getCircleHeadElement,
  getCircleTailElement,
  getCircleIndexElement,
  getCircleInCircleHeadElement,
  getCircleInCircleTailElement,
} from "./utils";
import { MIN_LIST_SIZE, MAX_LIST_SIZE } from "../../../src/constants/sizes";
import { HEAD, TAIL } from "../../../src/constants/element-captions";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

const checkRenderDefaultList = () => {
  cy.get("ul>li")
    .as("list")
    .then(($list) => {
      const listLength = $list.length;
      cy.wrap(listLength).should("be.gte", MIN_LIST_SIZE);
      cy.wrap(listLength).should("be.lte", MAX_LIST_SIZE);

      cy.get("@list").each(($el, index) => {
        getListItemElement($el);

        getCircleIndexElement().invoke("text").should("eq", `${index}`);

        getCircleElement();
        checkClassPresence("@circle", "circle_default__");

        if (index === 0 && listLength === 1) {
          getCircleHeadElement().invoke("text").should("eq", HEAD);
          getCircleTailElement().invoke("text").should("eq", TAIL);
        } else if (index === 0) {
          getCircleHeadElement().invoke("text").should("eq", HEAD);
          getCircleTailElement().invoke("text").should("eq", "");
        } else if (index === listLength - 1) {
          getCircleHeadElement().invoke("text").should("eq", "");
          getCircleTailElement().invoke("text").should("eq", TAIL);
        } else {
          getCircleHeadElement().invoke("text").should("eq", "");
          getCircleTailElement().invoke("text").should("eq", "");
        }
      });
    });
};

const checkAddToEdge = (value: string, type: typeof HEAD | typeof TAIL) => {
  cy.get("ul>li")
    .as("list")
    .then(($list) => {
      const listLength = $list.length;

      cy.get('input[name="listElement"]').type(value);
      cy.get('button[type="button"]')
        .contains(`Добавить в ${type}`)
        .parent()
        .click();

      cy.get("@list")
        .then(($list) => (type === TAIL ? $list.get().reverse() : $list))
        .each(($el, index) => {
          getListItemElement($el);

          if (index === 0) {
            getCircleHeadElement();
            getCircleInCircleHeadElement().invoke("text").should("eq", value);
            checkClassPresence("@circleInCircleHead", "circle_changing__");
            getCircleTailElement()
              .invoke("text")
              .should("eq", listLength === 1 || type === TAIL ? TAIL : "");
          } else if (index === listLength - 1) {
            getCircleHeadElement()
              .invoke("text")
              .should("eq", type === TAIL ? HEAD : "");
            getCircleTailElement()
              .invoke("text")
              .should("eq", type === TAIL ? "" : TAIL);
          } else {
            getCircleHeadElement().invoke("text").should("eq", "");
            getCircleTailElement().invoke("text").should("eq", "");
          }
        });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("@list")
        .should("have.length", listLength + 1)
        .then(($list) => (type === TAIL ? $list.get().reverse() : $list))
        .each(($el, index, $list) => {
          getListItemElement($el);

          if (index === 0) {
            getCircleElement().invoke("text").should("eq", value);
            getCircleHeadElement()
              .invoke("text")
              .should("eq", type === TAIL ? "" : HEAD);
            getCircleTailElement()
              .invoke("text")
              .should("eq", type === TAIL ? TAIL : "");
            checkClassPresence("@circle", "circle_modified__");
          } else if (index === $list.length - 1) {
            getCircleHeadElement()
              .invoke("text")
              .should("eq", type === TAIL ? HEAD : "");
            getCircleTailElement()
              .invoke("text")
              .should("eq", type === TAIL ? "" : TAIL);
          } else {
            getCircleHeadElement().invoke("text").should("eq", "");
            getCircleTailElement().invoke("text").should("eq", "");
          }
        });

      checkRenderDefaultList();
    });
};

const checkRemoveFromEdge = (type: typeof HEAD | typeof TAIL) => {
  cy.get("ul>li")
    .as("list")
    .then(($list) => {
      const listLength = $list.length;

      cy.get("@list")
        .then(($list) => (type === TAIL ? $list.get().reverse() : $list))
        .first()
        .find('*[class^="circle_circle__"]')
        .then(($circle) => {
          const deleteValue = $circle.text();

          cy.get('button[type="button"]')
            .contains(`Удалить из ${type}`)
            .parent()
            .click();

          cy.get("@list")
            .then(($list) => (type === TAIL ? $list.get().reverse() : $list))
            .each(($el, index) => {
              getListItemElement($el);

              if (index === 0) {
                getCircleElement().first().invoke("text").should("eq", "");
                getCircleTailElement();
                getCircleInCircleTailElement()
                  .invoke("text")
                  .should("eq", deleteValue);
                getCircleHeadElement()
                  .invoke("text")
                  .should("eq", listLength === 1 || type === HEAD ? HEAD : "");
                checkClassPresence("@circleInCircleTail", "circle_changing__");
              } else if (index === listLength - 1) {
                getCircleHeadElement()
                  .invoke("text")
                  .should("eq", type === TAIL ? HEAD : "");
                getCircleTailElement()
                  .invoke("text")
                  .should("eq", type === TAIL ? "" : TAIL);
              } else {
                getCircleHeadElement().invoke("text").should("eq", "");
                getCircleTailElement().invoke("text").should("eq", "");
              }
            });

          cy.wait(SHORT_DELAY_IN_MS);

          cy.get("@list")
            .should("have.length", listLength - 1)
            .its("length")
            .then((size) => size && checkRenderDefaultList());
        });
    });
};

const checkDeleteByIndexZero = () => {
  cy.get("ul>li")
    .as("list")
    .then(($list) => {
      const listLength = $list.length;

      cy.get("@list")
        .first()
        .find('*[class^="circle_circle__"]')
        .then(($circle) => {
          const deleteValue = $circle.text();

          cy.get('input[name="listIndex"]').type("0");
          cy.get('button[type="button"]')
            .contains("Удалить по индексу")
            .parent()
            .click();

          cy.get("@list").each(($el, index) => {
            getListItemElement($el);

            if (index === 0) {
              getCircleElement();
              getCircleHeadElement().invoke("text").should("eq", HEAD);
              checkClassPresence("@circle", "circle_changing__");
              getCircleTailElement()
                .invoke("text")
                .should("eq", listLength === 1 ? TAIL : "");
              checkClassPresence("@circle", "circle_changing__");
            } else if (index === listLength - 1) {
              getCircleHeadElement().invoke("text").should("eq", "");
              getCircleTailElement().invoke("text").should("eq", TAIL);
            } else {
              getCircleHeadElement().invoke("text").should("eq", "");
              getCircleTailElement().invoke("text").should("eq", "");
            }
          });

          cy.wait(SHORT_DELAY_IN_MS);

          cy.get("@list").each(($el, index) => {
            getListItemElement($el);

            if (index === 0) {
              getCircleElement().first().invoke("text").should("eq", "");
              checkClassPresence("@circle", "circle_default__");
              getCircleHeadElement().invoke("text").should("eq", HEAD);
              getCircleTailElement();
              getCircleInCircleTailElement()
                .invoke("text")
                .should("eq", deleteValue);
              checkClassPresence("@circleInCircleTail", "circle_changing__");
            } else if (index === listLength - 1) {
              getCircleHeadElement().invoke("text").should("eq", "");
              getCircleTailElement().invoke("text").should("eq", TAIL);
            } else {
              getCircleHeadElement().invoke("text").should("eq", "");
              getCircleTailElement().invoke("text").should("eq", "");
            }
          });

          cy.wait(SHORT_DELAY_IN_MS);

          cy.get("@list")
            .should("have.length", listLength - 1)
            .its("length")
            .then((size) => size && checkRenderDefaultList());
        });
    });
};

const checkAddByIndexZero = (value: string) => {
  cy.get("ul>li")
    .as("list")
    .then(($list) => {
      const listLength = $list.length;

      cy.get('input[name="listElement"]').type(value);
      cy.get('input[name="listIndex"]').type("0");
      cy.get('button[type="button"]')
        .contains("Добавить по индексу")
        .parent()
        .click();

      cy.get("@list").each(($el, index) => {
        getListItemElement($el);

        if (index === 0) {
          getCircleHeadElement().invoke("text").should("eq", value);
          getCircleInCircleHeadElement();
          getCircleTailElement()
            .invoke("text")
            .should("eq", listLength === 1 ? TAIL : "");
          checkClassPresence("@circleInCircleHead", "circle_changing__");
        } else if (index === listLength - 1) {
          getCircleHeadElement().invoke("text").should("eq", "");
          getCircleTailElement().invoke("text").should("eq", TAIL);
        } else {
          getCircleHeadElement().invoke("text").should("eq", "");
          getCircleTailElement().invoke("text").should("eq", "");
        }
      });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("@list")
        .should("have.length", listLength + 1)
        .each(($el, index, $list) => {
          getListItemElement($el);

          if (index === 0) {
            getCircleElement().invoke("text").should("eq", value);
            getCircleHeadElement().invoke("text").should("eq", HEAD);
            getCircleTailElement().invoke("text").should("eq", "");
            checkClassPresence("@circle", "circle_modified__");
          } else if (index === $list.length - 1) {
            getCircleHeadElement().invoke("text").should("eq", "");
            getCircleTailElement().invoke("text").should("eq", TAIL);
          } else {
            getCircleHeadElement().invoke("text").should("eq", "");
            getCircleTailElement().invoke("text").should("eq", "");
          }
        });

      checkRenderDefaultList();
    });
};

export {
  checkRenderDefaultList,
  checkAddToEdge,
  checkRemoveFromEdge,
  checkDeleteByIndexZero,
  checkAddByIndexZero,
};
