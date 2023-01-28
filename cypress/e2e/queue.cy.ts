import { isButtonDisabledWithEmptyInput, type IButton } from "./utils/utils";
import {
  checkAddToQueue,
  checkDeleteFromQueue,
  checkClearQueue,
} from "./utils/queue-utils";

describe("check queue functionality is correctly", () => {
  beforeEach(() => cy.visit("/queue"));

  it("should be add button is disabled if input is empty", () => {
    const buttons: IButton[] = [{ type: "submit", text: "Добавить" }];
    isButtonDisabledWithEmptyInput("queue", buttons);
  });

  it("should be correctly render add element to queue", () => {
    checkAddToQueue("t", 0, 0);
    checkAddToQueue("e", 0, 1);
    checkAddToQueue("s", 0, 2);
    checkAddToQueue("t", 0, 3);
  });

  describe("check delete elements from queue", () => {
    beforeEach(() => {
      checkAddToQueue("1", 0, 0);
      checkAddToQueue("2", 0, 1);
      checkAddToQueue("3", 0, 2);
    });

    it("should be correctly render delete element from queue", () => {
      checkDeleteFromQueue(0, 2);
      checkDeleteFromQueue(1, 2);
      checkDeleteFromQueue(2, 2);
    });

    it("should be correctly clear queue", () => checkClearQueue());
  });
});
