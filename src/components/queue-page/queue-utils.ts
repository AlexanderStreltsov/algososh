import { type Dispatch, type SetStateAction } from "react";
import { ElementStates, type IDisplayingElement } from "../../types";
import Queue from "./queue-init-class";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils";

const convertForDisplay = (queue: Queue<IDisplayingElement>) =>
  queue
    .getElements()
    .map((item) =>
      item === null ? { value: "", state: ElementStates.Default } : item
    );

const showEnqueue = async (
  queue: Queue<IDisplayingElement>,
  value: string,
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);

  const tailElBeforeEnqueue = queue.getTailElement();
  queue.enqueue({ value: "", state: ElementStates.Changing });
  setDisplaying([...convertForDisplay(queue)]);
  await delay(SHORT_DELAY_IN_MS);

  let tailElement = queue.getTailElement();
  if (tailElement !== null) {
    if (tailElBeforeEnqueue !== null) {
      delete tailElBeforeEnqueue.tail;
    }
    tailElement.value = value;
    tailElement.tail = "tail";
    if (queue.getLength() === 1) tailElement.head = "head";
  }
  setDisplaying([...convertForDisplay(queue)]);
  await delay(SHORT_DELAY_IN_MS);

  if (tailElement !== null) {
    tailElement.state = ElementStates.Default;
  }
  setDisplaying([...convertForDisplay(queue)]);

  setLoading(false);
};

const showDequeue = async (
  queue: Queue<IDisplayingElement>,
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);

  const peakElementBeforeDequeue = queue.peak();
  if (peakElementBeforeDequeue !== null) {
    peakElementBeforeDequeue.state = ElementStates.Changing;
  }
  setDisplaying([...convertForDisplay(queue)]);
  await delay(SHORT_DELAY_IN_MS);

  queue.dequeue();
  let peakElement = queue.peak();
  if (peakElement !== null) {
    peakElement.head = "head";
  }
  setDisplaying([...convertForDisplay(queue)]);

  setLoading(false);
};

export { showEnqueue, showDequeue };
