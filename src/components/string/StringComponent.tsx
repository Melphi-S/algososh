import React, { useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";

import { reverse } from "./algorithm";
import { changeElementsState, timeoutPromise } from "../../utils/utils";

import { ElementStates } from "../../types/element-states";
import { TCharElement } from "../../types/sortingElements";

import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState("");
  const [sortingElements, setSortingElements] = useState<TCharElement[]>([]);
  const [isButtonBlocked, setIsButtonBlocked] = useState(false);

  const visualizeAlgorithm = async () => {
    setIsButtonBlocked(true);
    const elements = value
      .split("")
      .map((char, index) => ({
        char,
        id: index,
        state: ElementStates.Default,
      }));
    setSortingElements(elements);
    await timeoutPromise(1000);
    const steps = Math.ceil(elements.length / 2);
    for (let i = 0; i < steps; i++) {
      const curElements = [elements[i], elements[elements.length - i - 1]];
      changeElementsState(curElements, ElementStates.Changing);
      setSortingElements([...elements]);
      await timeoutPromise(1000);
      reverse(elements, i);
      changeElementsState(curElements, ElementStates.Modified);
      setSortingElements([...elements]);
    }
    setIsButtonBlocked(false);
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
          isLoader={isButtonBlocked}
        >
          Развернуть
        </Button>
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
