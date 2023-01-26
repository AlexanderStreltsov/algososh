import { showBubleSorting, showSelectionSorting } from "./sorting-utils";
import { ElementStates, Direction, type IDisplayingElement } from "../../types";

jest.setTimeout(20000);

const setDisplayingMock = jest.fn();
const setLoadingMock = jest.fn();

const getDisplayingArr = (
  arr: number[],
  state: ElementStates
): IDisplayingElement[] => arr.map((item) => ({ value: item, state }));

const emptyArr: IDisplayingElement[] = [];
const oneElementArr = [0];
const someElementsArr = [1, 0, 3, 2, 4];
const resultSomeElAscArr = [0, 1, 2, 3, 4];
const resultSomeElDescArr = [4, 3, 2, 1, 0];

describe("function: show buble sorting", () => {
  it("sorts ascending correctly with empty array", async () => {
    await showBubleSorting(
      emptyArr,
      setDisplayingMock,
      setLoadingMock,
      Direction.Ascending
    );
    expect(setDisplayingMock).toHaveBeenCalledTimes(0);
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("sorts descending correctly with empty array", async () => {
    await showBubleSorting(
      emptyArr,
      setDisplayingMock,
      setLoadingMock,
      Direction.Descending
    );
    expect(setDisplayingMock).toHaveBeenCalledTimes(0);
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("sorts ascending correctly with one element array", async () => {
    await showBubleSorting(
      getDisplayingArr(oneElementArr, ElementStates.Default),
      setDisplayingMock,
      setLoadingMock,
      Direction.Ascending
    );
    expect(setDisplayingMock).toHaveBeenLastCalledWith(
      getDisplayingArr(oneElementArr, ElementStates.Modified)
    );
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("sorts descending correctly with one element array", async () => {
    await showBubleSorting(
      getDisplayingArr(oneElementArr, ElementStates.Default),
      setDisplayingMock,
      setLoadingMock,
      Direction.Descending
    );
    expect(setDisplayingMock).toHaveBeenLastCalledWith(
      getDisplayingArr(oneElementArr, ElementStates.Modified)
    );
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("sorts ascending correctly with some elements array", async () => {
    await showBubleSorting(
      getDisplayingArr(someElementsArr, ElementStates.Default),
      setDisplayingMock,
      setLoadingMock,
      Direction.Ascending
    );
    expect(setDisplayingMock).toHaveBeenLastCalledWith(
      getDisplayingArr(resultSomeElAscArr, ElementStates.Modified)
    );
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("sorts descending correctly with some elements array", async () => {
    await showBubleSorting(
      getDisplayingArr(someElementsArr, ElementStates.Default),
      setDisplayingMock,
      setLoadingMock,
      Direction.Descending
    );
    expect(setDisplayingMock).toHaveBeenLastCalledWith(
      getDisplayingArr(resultSomeElDescArr, ElementStates.Modified)
    );
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });
});

describe("function: show selection sorting", () => {
  it("sorts ascending correctly with empty array", async () => {
    await showSelectionSorting(
      emptyArr,
      setDisplayingMock,
      setLoadingMock,
      Direction.Ascending
    );
    expect(setDisplayingMock).toHaveBeenCalledTimes(0);
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("sorts descending correctly with empty array", async () => {
    await showSelectionSorting(
      emptyArr,
      setDisplayingMock,
      setLoadingMock,
      Direction.Descending
    );
    expect(setDisplayingMock).toHaveBeenCalledTimes(0);
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("sorts ascending correctly with one element array", async () => {
    await showSelectionSorting(
      getDisplayingArr(oneElementArr, ElementStates.Default),
      setDisplayingMock,
      setLoadingMock,
      Direction.Ascending
    );
    expect(setDisplayingMock).toHaveBeenLastCalledWith(
      getDisplayingArr(oneElementArr, ElementStates.Modified)
    );
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("sorts descending correctly with one element array", async () => {
    await showSelectionSorting(
      getDisplayingArr(oneElementArr, ElementStates.Default),
      setDisplayingMock,
      setLoadingMock,
      Direction.Descending
    );
    expect(setDisplayingMock).toHaveBeenLastCalledWith(
      getDisplayingArr(oneElementArr, ElementStates.Modified)
    );
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("sorts ascending correctly with some elements array", async () => {
    await showSelectionSorting(
      getDisplayingArr(someElementsArr, ElementStates.Default),
      setDisplayingMock,
      setLoadingMock,
      Direction.Ascending
    );
    expect(setDisplayingMock).toHaveBeenLastCalledWith(
      getDisplayingArr(resultSomeElAscArr, ElementStates.Modified)
    );
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("sorts descending correctly with some elements array", async () => {
    await showSelectionSorting(
      getDisplayingArr(someElementsArr, ElementStates.Default),
      setDisplayingMock,
      setLoadingMock,
      Direction.Descending
    );
    expect(setDisplayingMock).toHaveBeenLastCalledWith(
      getDisplayingArr(resultSomeElDescArr, ElementStates.Modified)
    );
    expect(setLoadingMock).toHaveBeenLastCalledWith(false);
  });
});
