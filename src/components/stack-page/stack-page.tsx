import React, { FC, useState, type FormEvent } from "react";
import { type TFormInputs, useForm } from "../../hooks";
import { type IDisplayingElement, StackActions } from "../../types";
import { showPushElement, showPopElement } from "./stack-utils";
import Stack from "./stack-class";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack.module.css";

const defaultInputValues: TFormInputs = {
  stack: {
    value: "",
  },
};

export const StackPage: FC = () => {
  const { values, setValues, handleChange } = useForm(defaultInputValues);
  const { value } = values["stack"];

  const [stack] = useState(new Stack<IDisplayingElement>());
  const [displayingElements, setDisplaying] = useState<IDisplayingElement[]>(
    []
  );
  const [isLoading, setLoading] = useState(false);
  const [action, setAction] = useState<StackActions>();

  const handlePush = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAction(StackActions.Push);
    setValues(defaultInputValues);
    showPushElement(stack, value, setDisplaying, setLoading);
  };

  const handlePop = () => {
    setAction(StackActions.Pop);
    showPopElement(stack, setDisplaying, setLoading);
  };

  const handleClear = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setAction(StackActions.Clear);
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
              isLoader={action === StackActions.Push && isLoading}
              disabled={!value || isLoading}
            />
            <Button
              text="Удалить"
              onClick={handlePop}
              isLoader={action === StackActions.Pop && isLoading}
              disabled={!size || isLoading}
            />
          </div>
          <Button
            text="Очистить"
            type="reset"
            isLoader={action === StackActions.Clear && isLoading}
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
              head={element?.head}
              index={index}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
