import { isButtonDisabledWithEmptyInput, type IButton } from "./utils/utils";
import { checkRenderCircleList } from "./utils/fibonacci-utils";

describe("check fibonacci functionality is correctly", () => {
  beforeEach(() => cy.visit("/fibonacci"));

  it("should be add button is disabled if input is empty", () => {
    const buttons: IButton[] = [{ type: "submit", text: "Рассчитать" }];
    isButtonDisabledWithEmptyInput("fibonacci", buttons);
  });

  it("should be correctly render two fibonacci number", () =>
    checkRenderCircleList(1, [1, 1]));

  it("should be correctly render four fibonacci numbers", () =>
    checkRenderCircleList(3, [1, 1, 2, 3]));

  it("should be correctly render nine fibonacci numbers", () =>
    checkRenderCircleList(8, [1, 1, 2, 3, 5, 8, 13, 21, 34]));
});
