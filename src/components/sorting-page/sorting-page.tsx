import React, { FC, useState, useEffect } from "react";
import {
  type IDisplayingElement,
  Direction,
  SortingName,
  ElementStates,
} from "../../types";
import { createRandomDisplayingArr } from "../../utils";
import { showBubleSorting, showSelectionSorting } from "./sorting-utils";
import { MIN_SORTING_SIZE, MAX_SORTING_SIZE } from "../../constants/sizes";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting.module.css";

export const SortingPage: FC = () => {
  const [displayingElements, setDisplaying] = useState<IDisplayingElement[]>(
    []
  );
  const [sortingName, setSortingName] = useState<SortingName>(
    SortingName.Selection
  );
  const [sortingDirection, setSortingDirection] = useState<Direction>();
  const [isLoading, setLoading] = useState(false);

  const handleSorting = (sorting: Direction) => {
    setSortingDirection(sorting);

    // reinit arr default state after one more click with out create new arr
    const arrDefault = displayingElements.map(({ value }) => ({
      value,
      state: ElementStates.Default,
    }));

    if (sortingName === SortingName.Selection) {
      showSelectionSorting(arrDefault, setDisplaying, setLoading, sorting);
    } else {
      showBubleSorting(arrDefault, setDisplaying, setLoading, sorting);
    }
  };

  const handleCreateRandomArr = () => {
    setLoading(true);
    setDisplaying(
      createRandomDisplayingArr(MIN_SORTING_SIZE, MAX_SORTING_SIZE)
    );
    setLoading(false);
  };

  useEffect(() => {
    setDisplaying(
      createRandomDisplayingArr(MIN_SORTING_SIZE, MAX_SORTING_SIZE)
    );
    return () => setDisplaying([]);
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.controls}>
        <div className={styles.radio}>
          <RadioInput
            label="Выбор"
            value={SortingName.Selection}
            checked={sortingName === SortingName.Selection}
            onChange={() => setSortingName(SortingName.Selection)}
            disabled={isLoading}
          />
          <RadioInput
            label="Пузырёк"
            value={SortingName.Buble}
            checked={sortingName === SortingName.Buble}
            onChange={() => setSortingName(SortingName.Buble)}
            disabled={isLoading}
          />
        </div>
        <div className={styles.sorting}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            onClick={() => handleSorting(Direction.Ascending)}
            isLoader={isLoading && sortingDirection === Direction.Ascending}
            disabled={isLoading}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => handleSorting(Direction.Descending)}
            isLoader={isLoading && sortingDirection === Direction.Descending}
            disabled={isLoading}
          />
        </div>
        <Button
          text="Новый массив"
          onClick={handleCreateRandomArr}
          disabled={isLoading}
        />
      </div>
      <ul className={styles.list}>
        {displayingElements.map((element, index) => (
          <li key={index}>
            <Column index={element.value as number} state={element.state} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
