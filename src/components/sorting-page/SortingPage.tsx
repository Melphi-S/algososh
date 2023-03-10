import React, { useEffect, useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";

import { generateArray, sortBubbleWay, sortSelectionWay } from "./utils";
import { randomArrayOptions } from "../../constants/arrayOptions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { SortingWay, TBarElement } from "../../types/sortingElements";
import { Direction } from "../../types/buttonEnums";

import styles from "./SortingPage.module.css";

export const SortingPage: React.FC = () => {
  const [sortingWay, setSortingWay] = useState<SortingWay>(
    SortingWay.Selection
  );
  const [array, setArray] = useState<TBarElement[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [loaderPosition, setLoaderPosition] = useState<Direction | null>(null);

  useEffect(() => {
    setArray(generateArray(randomArrayOptions));
  }, []);

  const visualizeAlgorithm = async (direction: Direction) => {
    setIsRunning(true);
    setLoaderPosition(direction);
    sortingWay === SortingWay.Selection
      ? await sortSelectionWay(array, direction, setArray, SHORT_DELAY_IN_MS)
      : await sortBubbleWay(array, direction, setArray, SHORT_DELAY_IN_MS);
    setIsRunning(false);
    setLoaderPosition(null);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div data-testid="sorting" className={styles.wrapper}>
        <div className={styles.radioButtons}>
          <RadioInput
            name="sortingWay"
            label="Выбор"
            checked={sortingWay === "selection"}
            onChange={() => setSortingWay(SortingWay.Selection)}
            disabled={isRunning}
          />
          <RadioInput
            name="sortingWay"
            label="Пузырёк"
            checked={sortingWay === "bubble"}
            onChange={() => setSortingWay(SortingWay.Bubble)}
            disabled={isRunning}
          />
        </div>
        <div className={styles.directionButtons}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass={styles.button}
            onClick={() => visualizeAlgorithm(Direction.Ascending)}
            disabled={isRunning}
            isLoader={loaderPosition === Direction.Ascending}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            extraClass={styles.button}
            onClick={() => visualizeAlgorithm(Direction.Descending)}
            disabled={isRunning}
            isLoader={loaderPosition === Direction.Descending}
          />
        </div>
        <Button
          text="Новый массив"
          extraClass={`${styles.button} ${styles.generateButton}`}
          onClick={() => setArray(generateArray(randomArrayOptions))}
          disabled={isRunning}
        />
        <div className={styles.algorithm}>
          {array.length > 0 &&
            array.map((element) => (
              <Column
                index={element.number}
                key={element.id}
                state={element.state}
              />
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
