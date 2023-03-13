import {TBarElement} from "../../types/sortingElements";
import {sortBubbleWay, sortSelectionWay} from "./utils";
import {Direction} from "../../types/buttonEnums";

const testArrays = [[6, 1, 5, 8, 3], [1], []];

const [severalElementsArray, singleElementArray, emptyArray] = testArrays.map((array) =>
  array.map((number, index) => ({ number, id: index }))
);

const assembleArrayBack = (array: TBarElement[]) =>
  array.map((element) => element.number);

const mock = jest.fn();

describe("Bubble sort algorithm", () => {
  it("should sort an array in ascending order", async function () {
      await sortBubbleWay(severalElementsArray, Direction.Ascending, mock, 0);
      expect(assembleArrayBack(severalElementsArray)).toEqual([1, 3, 5, 6, 8])
  });

    it("should sort an array in descending order", async function () {
        await sortBubbleWay(severalElementsArray, Direction.Descending, mock, 0);
        expect(assembleArrayBack(severalElementsArray)).toEqual([8, 6, 5, 3, 1])
    });

    it("should sort a single element array", async function () {
        await sortBubbleWay(singleElementArray, Direction.Ascending, mock, 0);
        expect(assembleArrayBack(singleElementArray)).toEqual([1])
    });

    it("should sort an empty array", async function () {
        await sortBubbleWay(emptyArray, Direction.Ascending, mock, 0);
        expect(assembleArrayBack(emptyArray)).toEqual([])
    });
});

describe("Selection sort algorithm", () => {
    it("should sort an array in ascending order", async function () {
        await sortSelectionWay(severalElementsArray, Direction.Ascending, mock, 0);
        expect(assembleArrayBack(severalElementsArray)).toEqual([1, 3, 5, 6, 8])
    });

    it("should sort an array in descending order", async function () {
        await sortSelectionWay(severalElementsArray, Direction.Descending, mock, 0);
        expect(assembleArrayBack(severalElementsArray)).toEqual([8, 6, 5, 3, 1])
    });

    it("should sort a single element array", async function () {
        await sortSelectionWay(singleElementArray, Direction.Ascending, mock, 0);
        expect(assembleArrayBack(singleElementArray)).toEqual([1])
    });

    it("should sort an empty array", async function () {
        await sortSelectionWay(emptyArray, Direction.Ascending, mock, 0);
        expect(assembleArrayBack(emptyArray)).toEqual([])
    });
});
