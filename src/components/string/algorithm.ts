import { swap } from "../../utils/utils";
import { TCharElement} from "./string";

export const reverse = (elements: TCharElement[], step: number | null = null): void => {
    let start = step ? 0 + step : 0;
    let end = step ? elements.length - 1 - step : elements.length - 1;
    while (start < end) {
        swap(elements, start, end);
        if (step !== null) {
            break;
        } else {
            start++;
            end--;
        }
    }
};
