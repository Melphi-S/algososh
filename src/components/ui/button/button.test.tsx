import { Button } from "./button";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  beforeEach(cleanup);

  it("should render with text", function () {
    render(<Button text="test" />);
    const button = screen.getByTestId("button");
    expect(button).toHaveTextContent("test");
    expect(button).toMatchSnapshot();
  });

  it("should render without text", function () {
    render(<Button />);
    const button = screen.getByTestId("button");
    expect(button).toHaveTextContent("");
    expect(button).toMatchSnapshot();
  });

  it("should render disabled", function () {
    render(<Button disabled />);
    const button = screen.getByTestId("button");
    expect(button).toBeDisabled();
    expect(button).toMatchSnapshot();
  });

  it("should render with loader", function () {
    render(<Button isLoader />);
    const button = screen.getByTestId("button");
    const loader = screen.getByTestId("loader");
    expect(button).toContainElement(loader);
    expect(button).toMatchSnapshot();
  });

  it("should call callback correctly", function () {
    const mock = jest.fn();
    render(<Button onClick={mock} />);
    const button = screen.getByTestId("button");
    userEvent.click(button);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
