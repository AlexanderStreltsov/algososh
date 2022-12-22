import React, { FC, useState, useEffect } from "react";
import { type TFormInputs, useForm } from "../../hooks";
import { type IDisplayingElement, ListActions } from "../../types";
import { LinkedList } from "./list-class";
import {
  createRandomListArr,
  showAddElement,
  showDeleteElement,
  showAddByIndex,
  showDeleteByIndex,
} from "./list-utils";
import { MAX_LIST_SIZE } from "../../constants/sizes";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list.module.css";

const defaultInputValues: TFormInputs = {
  listElement: {
    value: "",
  },
  listIndex: {
    value: "",
    pattern: /^[0-6]$/,
  },
};

export const ListPage: FC = () => {
  const { values, setValues, handleChange } = useForm(defaultInputValues);
  const listElementValue = values["listElement"].value;
  const listIndexValue = values["listIndex"].value;

  const [linkedList] = useState(new LinkedList<IDisplayingElement>());

  const [displayingElements, setDisplaying] = useState<IDisplayingElement[]>(
    []
  );

  const [isLoading, setLoading] = useState(false);
  const [action, setAction] = useState<ListActions>();

  const handleAddElement = (action: ListActions) => {
    setAction(action);
    setValues(defaultInputValues);
    showAddElement(
      linkedList,
      listElementValue,
      setDisplaying,
      setLoading,
      action
    );
  };

  const handleDeleteElement = (action: ListActions) => {
    setAction(action);
    showDeleteElement(linkedList, setDisplaying, setLoading, action);
  };

  const handleAddByIndex = () => {
    setAction(ListActions.AddByIndex);
    const index = +listIndexValue;
    showAddByIndex(
      linkedList,
      listElementValue,
      index,
      setDisplaying,
      setLoading
    );
  };

  const handleDeleteByIndex = () => {
    setAction(ListActions.DeleteByIndex);
    const index = +listIndexValue;
    showDeleteByIndex(linkedList, index, setDisplaying, setLoading);
  };

  const isDisabledAddButton = () =>
    !listElementValue || isLoading || sizeList >= MAX_LIST_SIZE;

  const isDisabledDeleteButton = () => isLoading || sizeList === 0;

  const sizeList = linkedList.getSize();

  useEffect(() => {
    setDisplaying([...createRandomListArr(linkedList)]);
  }, [linkedList]);

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <fieldset className={styles.inputs}>
          <Input
            name="listElement"
            value={listElementValue}
            maxLength={4}
            onChange={handleChange}
            disabled={isLoading}
            isLimitText
            autoFocus
          />
          <Input
            name="listIndex"
            type="number"
            value={listIndexValue}
            placeholder="Введите число"
            onChange={handleChange}
            disabled={isLoading}
          />
        </fieldset>
        <fieldset className={styles.controls}>
          <Button
            text="Добавить в head"
            onClick={() => handleAddElement(ListActions.Prepend)}
            isLoader={action === ListActions.Prepend && isLoading}
            disabled={isDisabledAddButton()}
          />
          <Button
            text="Добавить в tail"
            onClick={() => handleAddElement(ListActions.Append)}
            isLoader={action === ListActions.Append && isLoading}
            disabled={isDisabledAddButton()}
          />
          <Button
            text="Удалить из head"
            onClick={() => handleDeleteElement(ListActions.DeleteHead)}
            isLoader={action === ListActions.DeleteHead && isLoading}
            disabled={isDisabledDeleteButton()}
          />
          <Button
            text="Удалить из tail"
            onClick={() => handleDeleteElement(ListActions.DeleteTail)}
            isLoader={action === ListActions.DeleteTail && isLoading}
            disabled={isDisabledDeleteButton()}
          />

          <Button
            text="Добавить по индексу"
            extraClass={styles.buttonAddIndex}
            onClick={handleAddByIndex}
            isLoader={action === ListActions.AddByIndex && isLoading}
            disabled={
              isDisabledAddButton() ||
              !listIndexValue ||
              (+listIndexValue >= sizeList && +listIndexValue !== 0)
            }
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.buttonDeleteIndex}
            onClick={handleDeleteByIndex}
            isLoader={action === ListActions.DeleteByIndex && isLoading}
            disabled={
              isDisabledDeleteButton() ||
              !listIndexValue ||
              +listIndexValue >= sizeList
            }
          />
        </fieldset>
      </form>
      <ul className={styles.list}>
        {displayingElements.map((element, index) => (
          <li key={index}>
            <Circle
              state={element.state}
              letter={`${element.value}`}
              head={element?.head}
              index={index}
              tail={element?.tail}
            />
            {index !== sizeList - 1 && <ArrowIcon />}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
