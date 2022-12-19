import React, { FC, useState, FormEvent } from "react";
import { useForm } from "../../hooks";
import { showFibonacciNumbers } from "./fibinacci-utils";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci.module.css";

const defaultInputValues = {
  fibonacci: {
    value: "",
    pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$/,
  },
};

export const FibonacciPage: FC = () => {
  const { values, handleChange } = useForm(defaultInputValues);
  const { value } = values["fibonacci"];

  const [displayingElements, setDisplaying] = useState<number[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const indexOfNumber = +value;
    showFibonacciNumbers(indexOfNumber, setDisplaying, setLoading);
  };

  const justifyContent =
    displayingElements.length <= 10 ? "center" : "flex-start";

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="fibonacci"
          type="number"
          value={value}
          placeholder="Введите число"
          max={19}
          onChange={handleChange}
          disabled={isLoading}
          isLimitText
          autoFocus
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={isLoading}
          disabled={!value || isLoading}
        />
      </form>
      <ul className={styles.list} style={{ justifyContent: justifyContent }}>
        {displayingElements.map((element, index) => (
          <li key={index}>
            <Circle letter={`${element}`} index={index} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
