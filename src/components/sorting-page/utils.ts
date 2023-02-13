import {
  changeElementsState,
  getRandomNumber,
  swap,
  timeoutPromise,
} from "../../utils/utils";
import { TBarElement, TRandomArrayOptions } from "../../types/sortingElements";
import { Direction } from "../../types/direction";
import React from "react";
import { ElementStates } from "../../types/element-states";

export const sortBubbleWay = async (
  array: TBarElement[],
  direction: Direction,
  stateCb: React.Dispatch<React.SetStateAction<TBarElement[]>>,
  timeout: number
) => {
  for (let j = array.length - 1; j >= 0; j--) {
    for (let i = 0; i < j; i++) {
      const curElements = [array[i], array[i + 1]];
      changeElementsState(curElements, ElementStates.Changing);
      stateCb([...array]);
      if (direction === Direction.Ascending) {
        if (array[i].number > array[i + 1].number) {
          swap(array, i, i + 1);
        }
      } else {
        if (array[i].number < array[i + 1].number) {
          swap(array, i, i + 1);
        }
      }
      await timeoutPromise(timeout);
      changeElementsState([array[i]], ElementStates.Default);
      stateCb([...array]);
    }
    changeElementsState([array[j]], ElementStates.Modified);
    stateCb([...array]);
  }
};

export const sortSelectionWay = async (
  array: TBarElement[],
  direction: Direction,
  stateCb: React.Dispatch<React.SetStateAction<TBarElement[]>>,
  timeout: number
) => {
  for (let i = 0; i < array.length - 1; i++) {
    let indexToSwap = i;

    changeElementsState([array[i]], ElementStates.Swaping);
    for (let j = i + 1; j < array.length; j++) {
      changeElementsState([array[j]], ElementStates.Changing);
      stateCb([...array]);
      if (direction === Direction.Ascending) {
        if (array[j].number < array[indexToSwap].number) {
          if (indexToSwap !== i) {
            changeElementsState([array[indexToSwap]], ElementStates.Default);
          }
          indexToSwap = j;
          changeElementsState([array[indexToSwap]], ElementStates.Swaping);
        } else {
          changeElementsState([array[j]], ElementStates.Default);
        }
      } else {
        if (array[j].number > array[indexToSwap].number) {
          if (indexToSwap !== i) {
            changeElementsState([array[indexToSwap]], ElementStates.Default);
          }
          indexToSwap = j;
          changeElementsState([array[indexToSwap]], ElementStates.Swaping);
        } else {
          changeElementsState([array[j]], ElementStates.Default);
        }
      }
      await timeoutPromise(timeout);
    }
    swap(array, i, indexToSwap);
    changeElementsState([array[i]], ElementStates.Modified);
    if (indexToSwap !== i) {
      changeElementsState([array[indexToSwap]], ElementStates.Default);
    }
    stateCb([...array]);
  }
  changeElementsState([array[array.length - 1]], ElementStates.Modified);
  stateCb([...array]);
};

export const generateArray = (options: TRandomArrayOptions): TBarElement[] => {
  const { minNumber, maxNumber, minLength, maxLength } = options;
  const length = getRandomNumber(minLength, maxLength);
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push({ number: getRandomNumber(minNumber, maxNumber), id: i });
  }
  return array;
};
