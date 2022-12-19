import { type TDisplayingElement } from "../types/displaying-element";

export const swap = (
  arr: TDisplayingElement[],
  firstIndex: number,
  secondIndex: number
) => {
  [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};
