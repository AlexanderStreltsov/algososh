import { type Dispatch, type SetStateAction } from "react";
import { LinkedList } from "./list-class";
import {
  type IDisplayingElement,
  ElementStates,
  ListActions,
} from "../../types";
import { createRandomDisplayingArr } from "../../utils";
import { MIN_LIST_SIZE, MAX_LIST_SIZE } from "../../constants/sizes";
import { HEAD, TAIL } from "../../constants/element-captions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils";
import { Circle } from "../ui/circle/circle";

const createRandomListArr = (linkedList: LinkedList<IDisplayingElement>) => {
  linkedList.setFromArray(
    createRandomDisplayingArr(MIN_LIST_SIZE, MAX_LIST_SIZE)
  );

  const head = linkedList.getHead();
  if (head !== null) {
    head.value.head = HEAD;
  }

  const tail = linkedList.getTail();
  if (tail !== null) {
    tail.value.tail = TAIL;
  }

  return linkedList.getElementsToArray();
};

const setDisplayingWithDelay = async (
  array: IDisplayingElement[],
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>
) => {
  setDisplaying([...array]);
  await delay(SHORT_DELAY_IN_MS);
};

const getElementByAction = (
  action: ListActions,
  linkedList: LinkedList<IDisplayingElement>
) =>
  action === ListActions.Prepend || action === ListActions.DeleteHead
    ? linkedList.getHead()
    : linkedList.getTail();

//
// function displaying add to head or tail
//  |
//  |
//  V

const showAddElement = async (
  linkedList: LinkedList<IDisplayingElement>,
  value: string,
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  action: ListActions
) => {
  setLoading(true);

  let element = getElementByAction(action, linkedList);
  if (element !== null) {
    element.value.head = (
      <Circle state={ElementStates.Changing} letter={value} isSmall />
    );

    await setDisplayingWithDelay(
      [...linkedList.getElementsToArray()],
      setDisplaying
    );

    if (linkedList.getSize() === 1) {
      if (action === ListActions.Prepend) {
        delete element.value.head;
        element.value.tail = TAIL;
      } else {
        delete element.value.tail;
        element.value.head = HEAD;
      }
    } else {
      delete element.value.head;
      delete element.value.tail;
    }
  }

  if (action === ListActions.Prepend) {
    const newValue: IDisplayingElement =
      linkedList.getSize() === 0
        ? { value, state: ElementStates.Modified, head: HEAD, tail: TAIL }
        : { value, state: ElementStates.Modified, head: HEAD };

    linkedList.prepend(newValue);
  } else {
    const newValue: IDisplayingElement =
      linkedList.getSize() === 0
        ? { value, state: ElementStates.Modified, head: HEAD, tail: TAIL }
        : { value, state: ElementStates.Modified, tail: TAIL };

    linkedList.append(newValue);
  }

  await setDisplayingWithDelay(
    [...linkedList.getElementsToArray()],
    setDisplaying
  );

  element = getElementByAction(action, linkedList);
  if (element !== null) {
    element.value.state = ElementStates.Default;
  }

  setDisplaying([...linkedList.getElementsToArray()]);

  setLoading(false);
};

//
// function displaying delete from head or tail
//  |
//  |
//  V

const showDeleteElement = async (
  linkedList: LinkedList<IDisplayingElement>,
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  action: ListActions
) => {
  setLoading(true);

  let element = getElementByAction(action, linkedList);

  if (element !== null) {
    element.value.tail = (
      <Circle
        state={ElementStates.Changing}
        letter={element.value.value as string}
        isSmall
      />
    );

    element.value.value = "";

    await setDisplayingWithDelay(
      [...linkedList.getElementsToArray()],
      setDisplaying
    );
  }

  if (action === ListActions.DeleteHead) {
    linkedList.deleteHead();
  } else {
    linkedList.deleteTail();
  }

  element = getElementByAction(action, linkedList);
  if (element !== null) {
    if (action === ListActions.DeleteHead) {
      element.value.head = HEAD;
    } else {
      element.value.tail = TAIL;
    }
  }

  setDisplaying([...linkedList.getElementsToArray()]);

  setLoading(false);
};

//
// functions for displaying add by index
//  |
//  |
//  V

const setChangingBeforeAddByIndex = async (
  array: IDisplayingElement[],
  value: string,
  index: number,
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>
) => {
  let i = 0;
  while (i <= index) {
    array[i].head = (
      <Circle state={ElementStates.Changing} letter={value} isSmall />
    );

    await setDisplayingWithDelay([...array], setDisplaying);

    if (i === index) {
      break;
    }

    array[i].state = ElementStates.Changing;

    if (i === 0) {
      array[i].head = HEAD;
    } else {
      delete array[i].head;
    }

    i++;
  }
};

const setDefaultAfterAddByIndex = (
  array: IDisplayingElement[],
  index: number,
  isModified: boolean = false
) => {
  array.forEach((element, i) => {
    if (i === 0) {
      element.head = HEAD;
    } else {
      delete element.head;
    }

    if (i !== index) {
      element.state = ElementStates.Default;
    } else if (!isModified) {
      element.state = ElementStates.Default;
    }
  });
};

const showAddByIndex = async (
  linkedList: LinkedList<IDisplayingElement>,
  value: string,
  index: number,
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);

  const size = linkedList.getSize();

  if (size !== 0) {
    await setChangingBeforeAddByIndex(
      [...linkedList.getElementsToArray()],
      value,
      index,
      setDisplaying
    );
  }

  const newValue: IDisplayingElement =
    size === 0
      ? { value, state: ElementStates.Modified, tail: TAIL }
      : { value, state: ElementStates.Modified };

  linkedList.addByIndex(newValue, index);
  const array = linkedList.getElementsToArray();
  setDefaultAfterAddByIndex(array, index, true);
  await setDisplayingWithDelay([...array], setDisplaying);

  setDefaultAfterAddByIndex([...linkedList.getElementsToArray()], index);

  setLoading(false);
};

//
// functions for displaying delete by index
//  |
//  |
//  V

const setChangingBeforeDeleteByIndex = async (
  array: IDisplayingElement[],
  index: number,
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>
) => {
  let i = 0;
  while (i <= index) {
    array[i].state = ElementStates.Changing;
    await setDisplayingWithDelay([...array], setDisplaying);

    if (i === index) {
      array[i].tail = (
        <Circle
          state={ElementStates.Changing}
          letter={`${array[i].value}`}
          isSmall
        />
      );
      array[i].state = ElementStates.Default;
      array[i].value = "";
      await setDisplayingWithDelay([...array], setDisplaying);
      break;
    }

    i++;
  }
};

const setDefaultAfterDeleteByIndex = (array: IDisplayingElement[]) => {
  array.forEach((element, index) => {
    if (index === 0) {
      element.head = HEAD;
    }

    if (index === array.length - 1) {
      element.tail = TAIL;
    }

    element.state = ElementStates.Default;
  });
};

const showDeleteByIndex = async (
  linkedList: LinkedList<IDisplayingElement>,
  index: number,
  setDisplaying: Dispatch<SetStateAction<IDisplayingElement[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);

  await setChangingBeforeDeleteByIndex(
    [...linkedList.getElementsToArray()],
    index,
    setDisplaying
  );

  linkedList.deleteByIndex(index);
  const array = linkedList.getElementsToArray();
  setDefaultAfterDeleteByIndex(array);
  setDisplaying([...array]);

  setLoading(false);
};

export {
  createRandomListArr,
  showAddElement,
  showDeleteElement,
  showAddByIndex,
  showDeleteByIndex,
};
