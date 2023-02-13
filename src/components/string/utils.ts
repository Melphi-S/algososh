import {changeElementsState, swap, timeoutPromise} from "../../utils/utils";
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
  while (start < end) {
    await timeoutPromise(timeout);
    changeElementsState([elements[start], elements[end]], ElementStates.Changing);
    swap(elements, start, end);
    stateCb([...elements]);
    await timeoutPromise(DELAY_IN_MS);
    changeElementsState([elements[start], elements[end]], ElementStates.Modified);
    stateCb([...elements]);
    start++;
    end--;
  }
};
