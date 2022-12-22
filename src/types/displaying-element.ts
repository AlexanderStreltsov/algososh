import { type ReactElement } from "react";
import { ElementStates } from "./element-states";

export interface IDisplayingElement {
  value: string | number;
  state: ElementStates;
  head?: string | ReactElement;
  tail?: string | ReactElement;
}
