import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils";

type TDisplayingElement = {
  value: string;
  state: ElementStates;
};

const convertToArray = (value: string): TDisplayingElement[] =>
  value
    .split("")
    .map((item) => ({ value: item, state: ElementStates.Default }));

const swap = (
  arr: TDisplayingElement[],
  firstIndex: number,
  secondIndex: number
) => {
  [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};

const showReverseString = async (
  string: string,
  setDisplaying: Dispatch<SetStateAction<TDisplayingElement[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);

  const arr = convertToArray(string);

  let head = 0;
  let tail = arr.length - 1;

  while (head <= tail) {
    arr[head].state = ElementStates.Changing;
    arr[tail].state = ElementStates.Changing;
    setDisplaying([...arr]);

    await delay(DELAY_IN_MS);

    swap(arr, head, tail);
    arr[head].state = ElementStates.Modified;
    arr[tail].state = ElementStates.Modified;
    setDisplaying([...arr]);

    head++;
    tail--;
  }

  setLoading(false);
};

export { type TDisplayingElement, showReverseString };
