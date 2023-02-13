import React, { useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";

import { reverse } from "./utils";
import { changeElementsState, timeoutPromise } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

import { ElementStates } from "../../types/element-states";
import { TCharElement } from "../../types/sortingElements";

import styles from "./StringComponent.module.css";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState("");
  const [sortingElements, setSortingElements] = useState<TCharElement[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const visualizeAlgorithm = async () => {
    setIsLoader(true);
    const initialOrder: TCharElement[] = value.split("").map((char, index) => ({
      char,
      id: index,
      state: ElementStates.Default,
    }));
    setSortingElements(initialOrder);
    const reversedOrder = reverse([...initialOrder]);
    const steps = Math.ceil(initialOrder.length / 2);
    for (let i = 0; i < steps; i++) {
      await timeoutPromise(DELAY_IN_MS);
      const curElements = [
        initialOrder[i],
        initialOrder[initialOrder.length - i - 1],
      ];
      changeElementsState(curElements, ElementStates.Changing);
      setSortingElements([...initialOrder]);
      await timeoutPromise(DELAY_IN_MS);
      initialOrder[i] = reversedOrder[i];
      initialOrder[initialOrder.length - i - 1] =
        reversedOrder[initialOrder.length - i - 1];
      changeElementsState(curElements, ElementStates.Modified);
      setSortingElements([...initialOrder]);
    }
    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <Input
          value={value}
          onChange={(evt) => setValue(evt.currentTarget.value)}
          maxLength={11}
          isLimitText
          extraClass={styles.input}
        />
        <Button
          onClick={visualizeAlgorithm}
          text="Развернуть"
          extraClass={styles.button}
          isLoader={isLoader}
        />
{/*          Развернуть
        </Button>*/}
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
