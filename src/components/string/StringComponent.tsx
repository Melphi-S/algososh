import React, { useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";

import { assembleElementsArray, reverse } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { TCharElement } from "../../types/sortingElements";

import styles from "./StringComponent.module.css";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState("");
  const [sortingElements, setSortingElements] = useState<TCharElement[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const visualizeAlgorithm = async () => {
    setIsLoader(true);
    setValue("");
    const initialOrder: TCharElement[] = assembleElementsArray(value);
    setSortingElements(initialOrder);
    await reverse(initialOrder, setSortingElements, SHORT_DELAY_IN_MS);
    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div data-testid="recursion" className={styles.wrapper}>
        <Input
          value={value}
          onChange={(evt) => setValue(evt.currentTarget.value)}
          maxLength={11}
          isLimitText
          extraClass={styles.input}
          data-testid="value-input"
        />
        <Button
          onClick={visualizeAlgorithm}
          text="Развернуть"
          extraClass={styles.button}
          isLoader={isLoader}
          disabled={!value}
          data-testid="button"
        />
        <div className={styles.algorithm}>
          {sortingElements.length > 0 &&
            sortingElements.map((element) => (
              <Circle
                letter={element.char}
                key={element.id}
                state={element.state}
              />
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
