import { type IButton, isButtonDisabledWithEmptyInput } from "./utils/utils";
import {
  checkRenderDefaultList,
  checkAddToEdge,
  checkRemoveFromEdge,
  checkDeleteByIndexZero,
  checkAddByIndexZero,
} from "./utils/list-utils";
import { HEAD, TAIL } from "../../src/constants/element-captions";
import { MAX_LIST_SIZE } from "../../src/constants/sizes";

describe("check list functionality is correctly", () => {
  beforeEach(() => cy.visit("/list"));

  it("should be add to head or tail buttons are disabled if its input is empty", () => {
    const buttons: IButton[] = [
      { type: "button", text: "Добавить в head" },
      { type: "button", text: "Добавить в tail" },
    ];
    isButtonDisabledWithEmptyInput("listElement", buttons);
  });

  it("should add or remove by index buttons are disabled if its input is empty", () => {
    const buttons: IButton[] = [
      { type: "button", text: "Добавить по индексу" },
      { type: "button", text: "Удалить по индексу" },
    ];
    isButtonDisabledWithEmptyInput("listIndex", buttons);
  });

  it("should be correctly render default list", () => checkRenderDefaultList());

  it("should be correctly render remove element from head", () =>
    checkRemoveFromEdge(HEAD));

  it("should be correctly render remove element from tail", () =>
    checkRemoveFromEdge(TAIL));

  it("should be correctly render remove element by index 0", () =>
    checkDeleteByIndexZero());

  describe("check add to head or tail or by index", () => {
    beforeEach(() => {
      cy.get("ul>li")
        .its("length")
        .then((size) => {
          if (size === MAX_LIST_SIZE) {
            checkRemoveFromEdge(HEAD);
          }
        });
    });

    it("should be correctly render add element to head", () =>
      checkAddToEdge("test", HEAD));

    it("should be correctly render add element to tail", () =>
      checkAddToEdge("test", TAIL));

    it("should be correctly render add element by index 0", () =>
      checkAddByIndexZero("test"));
  });
});
