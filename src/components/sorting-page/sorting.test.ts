import { showBubleSorting, showSelectionSorting } from "./sorting-utils";
import { ElementStates, Direction, type IDisplayingElement } from "../../types";

jest.setTimeout(20000);

const setDisplayingMock = jest.fn();
const setLoadingMock = jest.fn();

const checkSortingWithEmptyArray = async (
  execFunction: Function,
  direction: Direction
) => {
  await execFunction([], setDisplayingMock, setLoadingMock, direction);
  expect(setDisplayingMock).toHaveBeenCalledTimes(0);
  expect(setLoadingMock).toHaveBeenLastCalledWith(false);
};

const getDisplayingArr = (
  arr: number[],
  state: ElementStates
): IDisplayingElement[] => arr.map((item) => ({ value: item, state }));

const checkSortingLastCalledWith = async (
  execFunction: Function,
  direction: Direction,
  initArr: number[],
  resultArr: number[]
) => {
  await execFunction(
    getDisplayingArr(initArr, ElementStates.Default),
    setDisplayingMock,
    setLoadingMock,
    direction
  );
  expect(setDisplayingMock).toHaveBeenLastCalledWith(
    getDisplayingArr(resultArr, ElementStates.Modified)
  );
  expect(setLoadingMock).toHaveBeenLastCalledWith(false);
};

describe("function: show buble sorting", () => {
  it("sorts ascending correctly with empty array", () =>
    checkSortingWithEmptyArray(showBubleSorting, Direction.Ascending));

  it("sorts descending correctly with empty array", async () =>
    checkSortingWithEmptyArray(showBubleSorting, Direction.Descending));

  it("sorts ascending correctly with one element array", () =>
    checkSortingLastCalledWith(
      showBubleSorting,
      Direction.Ascending,
      [0],
      [0]
    ));

  it("sorts descending correctly with one element array", () =>
    checkSortingLastCalledWith(
      showBubleSorting,
      Direction.Descending,
      [0],
      [0]
    ));

  it("sorts ascending correctly with some elements array", () =>
    checkSortingLastCalledWith(
      showBubleSorting,
      Direction.Ascending,
      [1, 0, 3, 2, 4],
      [0, 1, 2, 3, 4]
    ));

  it("sorts descending correctly with some elements array", () =>
    checkSortingLastCalledWith(
      showBubleSorting,
      Direction.Descending,
      [3, 0, 1, 2, 4],
      [4, 3, 2, 1, 0]
    ));
});

describe("function: show selection sorting", () => {
  it("sorts ascending correctly with empty array", () =>
    checkSortingWithEmptyArray(showSelectionSorting, Direction.Ascending));

  it("sorts descending correctly with empty array", () =>
    checkSortingWithEmptyArray(showSelectionSorting, Direction.Descending));

  it("sorts ascending correctly with one element array", () =>
    checkSortingLastCalledWith(
      showSelectionSorting,
      Direction.Ascending,
      [0],
      [0]
    ));

  it("sorts descending correctly with one element array", () =>
    checkSortingLastCalledWith(
      showSelectionSorting,
      Direction.Descending,
      [0],
      [0]
    ));

  it("sorts ascending correctly with some elements array", () =>
    checkSortingLastCalledWith(
      showSelectionSorting,
      Direction.Ascending,
      [4, 0, 3, 2, 1],
      [0, 1, 2, 3, 4]
    ));

  it("sorts descending correctly with some elements array", () =>
    checkSortingLastCalledWith(
      showSelectionSorting,
      Direction.Descending,
      [2, 0, 3, 1, 4],
      [4, 3, 2, 1, 0]
    ));
});
