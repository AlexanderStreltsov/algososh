import { isButtonDisabledWithEmptyInput, type IButton } from "./utils/utils";
import {
  checkAddToStack,
  checkDeleteFromStack,
  checkClearStack,
} from "./utils/stack-utils";

describe("check stack functionality is correctly", () => {
  beforeEach(() => cy.visit("/stack"));

  it("should be add button is disabled if input is empty", () => {
    const buttons: IButton[] = [{ type: "submit", text: "Добавить" }];
    isButtonDisabledWithEmptyInput("stack", buttons);
  });

  it("should be correctly render add element to stack", () => {
    checkAddToStack("t");
    checkAddToStack("e");
    checkAddToStack("s");
    checkAddToStack("t");
  });

  describe("check delete elements from stack", () => {
    beforeEach(() => {
      checkAddToStack("1");
      checkAddToStack("2");
      checkAddToStack("3");
    });

    it("should be correctly render delete element from stack", () => {
      checkDeleteFromStack();
      checkDeleteFromStack();
      checkDeleteFromStack();
    });

    it("should be correctly clear stack", () => checkClearStack());
  });
});
