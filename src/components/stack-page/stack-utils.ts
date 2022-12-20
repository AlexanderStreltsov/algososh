import { type Dispatch, type SetStateAction } from "react";
import { ElementStates } from "../../types";
import { type IDisplayingStack } from "./stack-page";
import Stack from "./stack-init-class";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils";

const showPushElement = async (
  stack: Stack<IDisplayingStack>,
  value: string,
  setDisplaying: Dispatch<SetStateAction<IDisplayingStack[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);

  let peak = stack.peak();
  if (peak !== null) {
    delete peak.top;
  }

  stack.push({ value, state: ElementStates.Changing, top: "top" });
  setDisplaying([...stack.getElements()]);
  await delay(SHORT_DELAY_IN_MS);

  peak = stack.peak();
  if (peak !== null) {
    peak.state = ElementStates.Default;
  }
  setDisplaying([...stack.getElements()]);

  setLoading(false);
};

const showPopElement = async (
  stack: Stack<IDisplayingStack>,
  setDisplaying: Dispatch<SetStateAction<IDisplayingStack[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);

  let peak = stack.peak();
  if (peak !== null) {
    peak.state = ElementStates.Changing;
  }
  setDisplaying([...stack.getElements()]);
  await delay(SHORT_DELAY_IN_MS);

  stack.pop();
  peak = stack.peak();
  if (peak !== null) {
    peak.top = "top";
  }
  setDisplaying([...stack.getElements()]);

  setLoading(false);
};

export { showPushElement, showPopElement };
