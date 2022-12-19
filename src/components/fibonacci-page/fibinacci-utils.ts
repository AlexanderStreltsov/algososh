import { Dispatch, SetStateAction } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils";

const getFibonacciNumbers = (indexOfNumber: number) => {
  let arr = [1, 1];
  for (let i = 2; i < indexOfNumber + 2; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }

  return arr;
};

const showFibonacciNumbers = async (
  indexOfNumber: number,
  setDisplaying: Dispatch<SetStateAction<number[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);

  const fibonacciArr = getFibonacciNumbers(indexOfNumber);

  let index = 0;
  while (index < fibonacciArr.length) {
    setDisplaying(fibonacciArr.slice(0, index));
    await delay(DELAY_IN_MS);
    index++;
  }

  setLoading(false);
};

export { showFibonacciNumbers };
