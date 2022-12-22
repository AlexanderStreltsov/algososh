import { type Dispatch, type SetStateAction } from "react";
import { ElementStates, type IDisplayingElement } from "../../types";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay, swap } from "../../utils";

const convertToArray = (value: string): IDisplayingElement[] =>
  value
    .split("")
    .map((item) => ({ value: item, state: ElementStates.Default }));

const showReverseString = async (
  string: string,
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>,
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

export { showReverseString };
