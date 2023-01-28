import { checkOpenPage } from "./utils/routing-utils";

describe("check routing from main page navigation", () => {
  beforeEach(() => cy.visit("/"));

  it("should be open string page", () => checkOpenPage("/recursion", "Строка"));

  it("should be open fibonacci page", () =>
    checkOpenPage("/fibonacci", "Последовательность Фибоначчи"));

  it("should be open sorting page", () =>
    checkOpenPage("/sorting", "Сортировка массива"));

  it("should be open stack page", () => checkOpenPage("/stack", "Стек"));

  it("should be open queue page", () => checkOpenPage("/queue", "Очередь"));

  it("should be open list page", () =>
    checkOpenPage("/list", "Связный список"));

  afterEach(() => cy.get("button").contains("К оглавлению").click());
});
