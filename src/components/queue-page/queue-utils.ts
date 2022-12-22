import { type Dispatch, type SetStateAction } from "react";
import { ElementStates, type IDisplayingElement } from "../../types";
import Queue from "./queue-class";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { delay } from "../../utils";

const createDefaultQueueArr = (size: number): IDisplayingElement[] =>
  [...Array(size)].map(() => ({
    value: "",
    state: ElementStates.Default,
  }));

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
    tailElement.tail = TAIL;
    if (queue.getLength() === 1) tailElement.head = HEAD;

    setDisplaying([...convertForDisplay(queue)]);
    await delay(SHORT_DELAY_IN_MS);

    tailElement.state = ElementStates.Default;

    setDisplaying([...convertForDisplay(queue)]);
  }

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
    setDisplaying([...convertForDisplay(queue)]);
    await delay(SHORT_DELAY_IN_MS);
  }

  queue.dequeue();
  let peakElement = queue.peak();
  if (peakElement !== null) {
    peakElement.head = HEAD;
  }
  setDisplaying([...convertForDisplay(queue)]);

  setLoading(false);
};

export { createDefaultQueueArr, showEnqueue, showDequeue };
