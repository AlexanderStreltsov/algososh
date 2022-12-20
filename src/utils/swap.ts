import { type IDisplayingElement } from "../types/displaying-element";

export const swap = (
  arr: IDisplayingElement[],
  firstIndex: number,
  secondIndex: number
) => {
  [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};
