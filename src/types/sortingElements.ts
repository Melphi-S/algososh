import {ElementStates} from "./element-states";

export type TCharElement = {
    char: string;
    id: number;
    state?: ElementStates;
}

export type TBarElement = {
    number: number,
    id: number,
    state?: ElementStates;
}

export type TRandomArrayOptions = {
    minNumber: number;
    maxNumber: number;
    minLength: number;
    maxLength: number;
}

export enum SortingWay {
    Bubble = "bubble",
    Selection = "selection",
}