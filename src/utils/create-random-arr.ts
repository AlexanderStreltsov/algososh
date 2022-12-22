import { ElementStates, type IDisplayingElement } from "../types";

const getRandomInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const createRandomDisplayingArr = (
  minLength: number,
  maxLength: number
): IDisplayingElement[] => {
  const arr = [];
  let length = getRandomInteger(minLength, maxLength);

  while (length > 0) {
    arr.push({ value: getRandomInteger(0, 100), state: ElementStates.Default });
    length--;
  }

  return arr;
};
