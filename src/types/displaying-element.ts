import { ElementStates } from "./element-states";

export interface IDisplayingElement {
  value: string | number;
  state: ElementStates;
  head?: "head" | "top";
  tail?: "tail";
}
