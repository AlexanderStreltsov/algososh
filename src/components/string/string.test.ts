import { showReverseString } from "./string-utils";
import { ElementStates, type IDisplayingElement } from "../../types";

const setDisplayingMock = jest.fn();
const setLoadingMock = jest.fn();

const getResultArr = (value: string): IDisplayingElement[] =>
  value
    .split("")
    .map((item) => ({ value: item, state: ElementStates.Modified }));

const checkReverseLastCalledWith = async (
  initStr: string,
  resultStr: string
) => {
  await showReverseString(initStr, setDisplayingMock, setLoadingMock);
  const resultArr = getResultArr(resultStr);
  expect(setDisplayingMock).toHaveBeenLastCalledWith(resultArr);
  expect(setLoadingMock).toHaveBeenLastCalledWith(false);
};

describe("function: show reverse string", () => {
  it("reverses correctly with even chars", () =>
    checkReverseLastCalledWith("test", "tset"));

  it("reverses correctly with odd chars", () =>
    checkReverseLastCalledWith("test1", "1tset"));

  it("reverses correctly with one char", () =>
    checkReverseLastCalledWith("1", "1"));

  it("reverses correctly with empty string", async () => {
    const string = "";
    await showReverseString(string, setDisplayingMock, setLoadingMock);
    expect(setDisplayingMock).toHaveBeenCalledTimes(0);
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });
});
