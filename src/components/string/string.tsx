import React, { useState, FormEvent } from "react";
import styles from "./string.module.css";
import { useForm } from "../../hooks";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { type TDisplayingElement, showReverseString } from "./utils";

const defaultInputValues = {
  string: "",
};

export const StringComponent: React.FC = () => {
  const { values, isEmpty, handleChange } = useForm(defaultInputValues);

  const [displayingElements, setDisplaying] = useState<
    Array<TDisplayingElement>
  >([]);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showReverseString(values["string"], setDisplaying, setLoading);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="string"
          value={values["string"]}
          maxLength={11}
          onChange={handleChange}
          disabled={isLoading}
          isLimitText
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoading}
          disabled={isEmpty || isLoading}
        />
      </form>
      <ul className={styles.list}>
        {displayingElements.map((element, index) => (
          <li key={index}>
            <Circle state={element.state} letter={element.value} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
