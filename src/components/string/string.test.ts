import { showReverseString } from "./string-utils";
import { ElementStates, type IDisplayingElement } from "../../types";

const setDisplayingMock = jest.fn();
const setLoadingMock = jest.fn();

const getResultArr = (value: string): IDisplayingElement[] =>
  value
    .split("")
    .map((item) => ({ value: item, state: ElementStates.Modified }));

describe("function: show reverse string", () => {
  it("reverses correctly with even chars", async () => {
    const string = "test";
    const checkString = "tset";
    await showReverseString(string, setDisplayingMock, setLoadingMock);
    expect(setDisplayingMock).toHaveBeenLastCalledWith(
      getResultArr(checkString)
    );
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("reverses correctly with odd chars", async () => {
    const string = "test1";
    const checkString = "1tset";
    await showReverseString(string, setDisplayingMock, setLoadingMock);
    expect(setDisplayingMock).toHaveBeenLastCalledWith(
      getResultArr(checkString)
    );
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("reverses correctly with one char", async () => {
    const string = "1";
    const checkString = "1";
    await showReverseString(string, setDisplayingMock, setLoadingMock);
    expect(setDisplayingMock).toHaveBeenLastCalledWith(
      getResultArr(checkString)
    );
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("reverses correctly with empty string", async () => {
    const string = "";
    await showReverseString(string, setDisplayingMock, setLoadingMock);
    expect(setDisplayingMock).toHaveBeenCalledTimes(0);
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });
});
