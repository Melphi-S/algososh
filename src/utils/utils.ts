import { ElementStates } from "../types/element-states";

export const swap = <T>(array: T[], i: number, j: number) => {
  [array[i], array[j]] = [array[j], array[i]];
};

export const changeElementsState = (elements: any[], state: ElementStates) => {
  elements.forEach((element) => (element.state = state));
};

export const timeoutPromise = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
