import React, { FC, useState, type FormEvent } from "react";
import { type TFormInputs, useForm } from "../../hooks";
import { type IDisplayingElement, QueueActions } from "../../types";
import Queue from "./queue-class";
import { createDefaultQueueArr, showEnqueue, showDequeue } from "./queue-utils";
import { MAX_QUEUE_SIZE } from "../../constants/sizes";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue.module.css";

const defaultInputValues: TFormInputs = {
  queue: {
    value: "",
  },
};

export const QueuePage: FC = () => {
  const { values, setValues, handleChange } = useForm(defaultInputValues);
  const { value } = values["queue"];

  const [queue] = useState(new Queue<IDisplayingElement>(MAX_QUEUE_SIZE));

  const [displayingElements, setDisplaying] = useState<IDisplayingElement[]>(
    createDefaultQueueArr(MAX_QUEUE_SIZE)
  );

  const [isLoading, setLoading] = useState(false);
  const [action, setAction] = useState<QueueActions>();

  const handleEnqueue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAction(QueueActions.Enqueue);
    setValues(defaultInputValues);
    showEnqueue(queue, value, setDisplaying, setLoading);
  };

  const handleDequeue = () => {
    setAction(QueueActions.Dequeue);
    showDequeue(queue, setDisplaying, setLoading);
  };

  const handleClear = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setAction(QueueActions.Clear);
    queue.clear();
    setDisplaying(createDefaultQueueArr(MAX_QUEUE_SIZE));
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
              isLoader={action === QueueActions.Enqueue && isLoading}
              disabled={!value || queueLength === MAX_QUEUE_SIZE || isLoading}
            />
            <Button
              text="Удалить"
              onClick={handleDequeue}
              isLoader={action === QueueActions.Dequeue && isLoading}
              disabled={!queueLength || isLoading}
            />
          </div>
          <Button
            text="Очистить"
            type="reset"
            isLoader={action === QueueActions.Clear && isLoading}
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
