import React, { useMemo, useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { timeoutPromise } from "../../utils/utils";
import { generateFibArray } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { TCharElement } from "../../types/sortingElements";

import styles from "./FibonacciPage.module.css";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [fibArray, setFibArray] = useState<TCharElement[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const visualizeAlgorithm = async () => {
    setIsLoader(true);
    const finalArray = generateFibArray(Number(value)).map((char, index) => ({
      char: String(char),
      id: index,
    }));
    for (let i = 0; i <= finalArray.length; i++) {
      await timeoutPromise(SHORT_DELAY_IN_MS);
      setFibArray([...finalArray].slice(0, i));
    }

    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <Input
          value={value}
          onChange={(evt) => setValue(evt.currentTarget.value)}
          type="number"
          min={0}
          max={19}
          isLimitText
          extraClass={styles.input}
        />
        <Button
          onClick={visualizeAlgorithm}
          text="Рассчитать"
          extraClass={styles.button}
          isLoader={isLoader}
          disabled={Number(value) < 0 || Number(value) > 19 || value === ""}
        />
        <div className={styles.algorithm}>
          {fibArray.length > 0 &&
            fibArray.map((element) => (
              <Circle
                letter={element.char}
                key={element.id}
                index={element.id}
              />
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
