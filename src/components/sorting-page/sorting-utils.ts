import { type Dispatch, type SetStateAction } from "react";
import { ElementStates, Direction, type IDisplayingElement } from "../../types";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay, swap } from "../../utils";

const getRandomInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const createRandomArr = (): IDisplayingElement[] => {
  const arr = [];
  let length = getRandomInteger(3, 17);

  while (length > 0) {
    arr.push({ value: getRandomInteger(0, 100), state: ElementStates.Default });
    length--;
  }

  return arr;
};

const showBubleSorting = async (
  arr: IDisplayingElement[],
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  direction: Direction
) => {
  setLoading(true);

  const length = arr.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      setDisplaying([...arr]);
      await delay(DELAY_IN_MS);

      if (
        (direction === Direction.Ascending &&
          arr[j].value > arr[j + 1].value) ||
        (direction === Direction.Descending && arr[j].value < arr[j + 1].value)
      ) {
        swap(arr, j, j + 1);
      }

      arr[j].state = ElementStates.Default;
    }

    arr[length - i - 1].state = ElementStates.Modified;
    setDisplaying([...arr]);
    await delay(DELAY_IN_MS);
  }

  setLoading(false);
};

const showSelectionSorting = async (
  arr: IDisplayingElement[],
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  direction: Direction
) => {
  setLoading(true);

  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    arr[i].state = ElementStates.Changing;

    let controlIndex = i;
    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing;
      setDisplaying([...arr]);
      await delay(DELAY_IN_MS);

      if (
        (direction === Direction.Ascending &&
          arr[j].value < arr[controlIndex].value) ||
        (direction === Direction.Descending &&
          arr[j].value > arr[controlIndex].value)
      ) {
        controlIndex = j;
      }

      arr[j].state = ElementStates.Default;
      setDisplaying([...arr]);
    }

    swap(arr, i, controlIndex);
    arr[controlIndex].state = ElementStates.Default;
    arr[i].state = ElementStates.Modified;
  }

  arr[length - 1].state = ElementStates.Modified;
  setDisplaying([...arr]);

  setLoading(false);
};

export { createRandomArr, showBubleSorting, showSelectionSorting };
