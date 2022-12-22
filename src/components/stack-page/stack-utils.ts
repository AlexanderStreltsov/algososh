import { type Dispatch, type SetStateAction } from "react";
import { ElementStates, type IDisplayingElement } from "../../types";
import Stack from "./stack-class";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils";
import { TOP } from "../../constants/element-captions";

const showPushElement = async (
  stack: Stack<IDisplayingElement>,
  value: string,
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);

  let peak = stack.peak();
  if (peak !== null) {
    delete peak.head;
  }

  stack.push({ value, state: ElementStates.Changing, head: TOP });
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
  stack: Stack<IDisplayingElement>,
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>,
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
    peak.head = TOP;
  }
  setDisplaying([...stack.getElements()]);

  setLoading(false);
};

export { showPushElement, showPopElement };
