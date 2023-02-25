import {changeElementsState, cloneState, swap, timeoutPromise} from "../../utils/utils";
import { TCharElement } from "../../types/sortingElements";
import React from "react";
import {DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

export const reverse = async (
  elements: TCharElement[],
  stateCb: React.Dispatch<React.SetStateAction<TCharElement[]>>,
  timeout: number
) => {
  let start = 0;
  let end = elements.length - 1;
  while (start <= end) {
    await timeoutPromise(timeout);
    changeElementsState([elements[start], elements[end]], ElementStates.Changing);
    stateCb(cloneState(elements));
    await timeoutPromise(DELAY_IN_MS);
    swap(elements, start, end);
    changeElementsState([elements[start], elements[end]], ElementStates.Modified);
    stateCb(cloneState(elements));
    start++;
    end--;
  }
};
