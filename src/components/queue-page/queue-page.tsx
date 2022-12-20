import React, { FC, useState, type FormEvent } from "react";
import { useForm } from "../../hooks";
import {
  type IDisplayingElement,
  ElementStates,
  QueueAction,
} from "../../types";
import Queue from "./queue-init-class";
import { showEnqueue, showDequeue } from "./queue-utils";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue.module.css";

const defaultInputValues = {
  queue: {
    value: "",
  },
};

const defautQueueSize: number = 7;

const defaultQueue: IDisplayingElement[] = [...Array(defautQueueSize)].map(
  () => ({
    value: "",
    state: ElementStates.Default,
  })
);

export const QueuePage: FC = () => {
  const { values, setValues, handleChange } = useForm(defaultInputValues);
  const { value } = values["queue"];

  const [queue] = useState(new Queue<IDisplayingElement>(defautQueueSize));

  const [displayingElements, setDisplaying] =
    useState<IDisplayingElement[]>(defaultQueue);

  const [isLoading, setLoading] = useState(false);
  const [action, setAction] = useState<QueueAction>();

  const handleEnqueue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAction(QueueAction.Enqueue);
    setValues(defaultInputValues);
    showEnqueue(queue, value, setDisplaying, setLoading);
  };

  const handleDequeue = () => {
    setAction(QueueAction.Dequeue);
    showDequeue(queue, setDisplaying, setLoading);
  };

  const handleClear = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setAction(QueueAction.Clear);
    queue.clear();
    setDisplaying(defaultQueue);
    setLoading(false);
  };

  const queueLength = queue.getLength();

  return (
    <SolutionLayout title="Очередь">
      <form
        className={styles.form}
        onSubmit={handleEnqueue}
        onReset={handleClear}
      >
        <Input
          name="queue"
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
              isLoader={action === QueueAction.Enqueue && isLoading}
              disabled={!value || queueLength === defautQueueSize || isLoading}
            />
            <Button
              text="Удалить"
              onClick={handleDequeue}
              isLoader={action === QueueAction.Dequeue && isLoading}
              disabled={!queueLength || isLoading}
            />
          </div>
          <Button
            text="Очистить"
            type="reset"
            isLoader={action === QueueAction.Clear && isLoading}
            disabled={!queueLength || isLoading}
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
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
