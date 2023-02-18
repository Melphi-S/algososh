import React, { useMemo, useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";

import {changeElementsState, cloneState, timeoutPromise} from "../../utils/utils";
import { Stack } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { TCharElement } from "../../types/sortingElements";
import { ElementStates } from "../../types/element-states";
import { Action } from "../../types/buttonEnums";

import styles from "./StackPage.module.css";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [stackElements, setStackElements] = useState<TCharElement[]>([]);
  const [loaderPosition, setLoaderPosition] = useState<Action | null>(null);

  const stack = useMemo(() => new Stack<TCharElement>(), []);

  const clearPrevPeak = () => {
    const prevPeak = stack.peak();
    if (prevPeak) {
      prevPeak.head = undefined;
    }
  };

  const setNewPeak = () => {
    const newPeak = stack.peak();
    if (newPeak) {
      newPeak.head = "top";
    }
  };

  const visualizePushing = async () => {
    setLoaderPosition(Action.Add);
    setValue("");
    const newElement: TCharElement = {
      char: value,
      id: stack.getSize(),
      head: "top",
    };
    clearPrevPeak();
    stack.push(newElement);
    changeElementsState([stack.peak()], ElementStates.Changing);
    setStackElements(cloneState(stack.getStack()));
    await timeoutPromise(SHORT_DELAY_IN_MS);
    changeElementsState([stack.peak()], ElementStates.Default);
    setStackElements(cloneState(stack.getStack()));
    setLoaderPosition(null);
  };

  const visualizePopping = async () => {
    setLoaderPosition(Action.Delete);
    const prevPeak = stack.peak();
    if (prevPeak) {
      changeElementsState([prevPeak], ElementStates.Changing);
    }
    setStackElements(cloneState(stack.getStack()));
    await timeoutPromise(SHORT_DELAY_IN_MS);
    clearPrevPeak();
    stack.pop();
    setNewPeak();
    setStackElements(cloneState(stack.getStack()));
    setLoaderPosition(null);
  };

  const clearStack = () => {
    stack.clear();
    setStackElements(cloneState(stack.getStack()));
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <fieldset className={styles.fieldset}>
          <Input
            value={value}
            onChange={(evt) => setValue(evt.currentTarget.value)}
            maxLength={4}
            isLimitText
            extraClass={styles.input}
          />
          <div className={styles.directionButtons}>
            <Button
              text="Добавить"
              extraClass={styles.button}
              onClick={visualizePushing}
              disabled={!value || loaderPosition !== null || stack.getSize() >= 10}
              isLoader={loaderPosition === Action.Add}
            />
            <Button
              text="Удалить"
              extraClass={styles.button}
              onClick={visualizePopping}
              disabled={!stack.peak() || loaderPosition !== null}
              isLoader={loaderPosition === Action.Delete}
            />
          </div>
          <Button
            text="Очистить"
            extraClass={styles.button}
            onClick={clearStack}
            disabled={!stack.peak() || loaderPosition !== null}
          />
        </fieldset>
        <div className={styles.algorithm}>
          {stackElements.length > 0 &&
            stackElements.map((element, index) => (
              <Circle
                letter={element.char}
                key={element.id}
                head={element.head}
                state={element.state}
                index={index}
              />
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
