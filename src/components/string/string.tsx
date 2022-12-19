import React, { FC, useState, FormEvent } from "react";
import { useForm } from "../../hooks";
import { type TDisplayingElement } from "../../types/displaying-element";
import { showReverseString } from "./string-utils";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";

const defaultInputValues = {
  string: {
    value: "",
  },
};

export const StringComponent: FC = () => {
  const { values, handleChange } = useForm(defaultInputValues);
  const { value } = values["string"];

  const [displayingElements, setDisplaying] = useState<TDisplayingElement[]>(
    []
  );
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showReverseString(value, setDisplaying, setLoading);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="string"
          value={value}
          maxLength={11}
          onChange={handleChange}
          disabled={isLoading}
          isLimitText
          autoFocus
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoading}
          disabled={!value || isLoading}
        />
      </form>
      <ul className={styles.list}>
        {displayingElements.map((element, index) => (
          <li key={index}>
            <Circle state={element.state} letter={`${element.value}`} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
