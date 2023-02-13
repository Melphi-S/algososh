import { swap } from "../../utils/utils";
import { TCharElement } from "../../types/sortingElements";

export const reverse = (elements: TCharElement[]): TCharElement[] => {
  let start = 0;
  let end = elements.length - 1;
  while (start < end) {
    swap(elements, start++, end--);
  }
  return elements;
};
