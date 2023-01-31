interface IButton {
  type: string;
  text: string;
}

const isButtonDisabledWithEmptyInput = (
  inputName: string,
  buttons: IButton[]
) => {
  cy.get(`input[name="${inputName}"]`).should("be.empty");

  buttons.forEach(({ type, text }) => {
    cy.get(`button[type="${type}"]`)
      .contains(text)
      .parent()
      .should("be.disabled");
  });
};

const checkClassPresence = (selector: string, className: string) =>
  cy.get(selector).invoke("attr", "class").should("contain", className);

const getListItemElement = (element: JQuery<HTMLElement>) =>
  cy.wrap(element).as("listItem");

const getCircleElement = () =>
  cy.get("@listItem").find('*[class^="circle_circle__"]').as("circle");

const getCircleIndexElement = () =>
  cy.get("@listItem").find('[class*="circle_index__"]').as("circleIndex");

const getCircleHeadElement = () =>
  cy.get("@listItem").find('[class*="circle_head__"]').as("circleHead");

const getCircleTailElement = () =>
  cy.get("@listItem").find('[class*="circle_tail"]').as("circleTail");

const getCircleInCircleHeadElement = () =>
  cy
    .get("@circleHead")
    .find('[class*="circle_circle__"]')
    .as("circleInCircleHead");

const getCircleInCircleTailElement = () =>
  cy
    .get("@circleTail")
    .find('[class*="circle_circle__"]')
    .as("circleInCircleTail");

export {
  type IButton,
  isButtonDisabledWithEmptyInput,
  checkClassPresence,
  getListItemElement,
  getCircleElement,
  getCircleIndexElement,
  getCircleHeadElement,
  getCircleTailElement,
  getCircleInCircleHeadElement,
  getCircleInCircleTailElement,
};
