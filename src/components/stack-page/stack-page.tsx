import React, { FC, useState, type FormEvent } from "react";
import { useForm } from "../../hooks";
import { type IDisplayingElement, StackAction } from "../../types";
import { showPushElement, showPopElement } from "./stack-utils";
import Stack from "./stack-init-class";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack.module.css";

const defaultInputValues = {
  stack: {
    value: "",
  },
};

export interface IDisplayingStack extends IDisplayingElement {
  top?: "top";
}

export const StackPage: FC = () => {
  const { values, setValues, handleChange } = useForm(defaultInputValues);
  const { value } = values["stack"];

  const [stack] = useState(new Stack<IDisplayingStack>());
  const [displayingElements, setDisplaying] = useState<IDisplayingStack[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [action, setAction] = useState<StackAction>();

  const handlePush = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAction(StackAction.Push);
    setValues(defaultInputValues);
    showPushElement(stack, value, setDisplaying, setLoading);
  };

  const handlePop = () => {
    setAction(StackAction.Pop);
    showPopElement(stack, setDisplaying, setLoading);
  };

  const handleClear = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setAction(StackAction.Clear);
    stack.clear();
    setDisplaying([...stack.getElements()]);
    setLoading(false);
  };

  const size = displayingElements.length;
  const justifyContent = size <= 10 ? "center" : "flex-start";

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handlePush} onReset={handleClear}>
        <Input
          name="stack"
          value={value}
          maxLength={4}
          onChange={handleChange}
          disabled={isLoading}
          isLimitText
          autoFocus
        />
        <fieldset className={styles.controls}>
          <div>
            <Button
              text="Добавить"
              type="submit"
              isLoader={action === StackAction.Push && isLoading}
              disabled={!value || isLoading}
            />
            <Button
              text="Удалить"
              onClick={handlePop}
              isLoader={action === StackAction.Pop && isLoading}
              disabled={!size || isLoading}
            />
          </div>
          <Button
            text="Очистить"
            type="reset"
            isLoader={action === StackAction.Clear && isLoading}
            disabled={!size || isLoading}
          />
        </fieldset>
      </form>
      <ul className={styles.list} style={{ justifyContent: justifyContent }}>
        {displayingElements.map((element, index) => (
          <li key={index}>
            <Circle
              state={element.state}
              letter={`${element.value}`}
              head={element?.top}
              index={index}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
