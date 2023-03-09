import { Button } from "./button";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Check Button-component", () => {
  beforeEach(cleanup);

  it("should render button with text", function () {
    render(<Button text="test" />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("test");
    expect(button).toMatchSnapshot();
  });

  it("should render button without text", function () {
    render(<Button />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("");
    expect(button).toMatchSnapshot();
  });

  it("should render disabled button", function () {
    render(<Button disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toMatchSnapshot();
  });

  it("should render button with loader", function () {
    render(<Button isLoader />);
    const button = screen.getByRole("button");
    const loader = screen.getByTestId("loader");
    expect(button).toContainElement(loader);
    expect(button).toMatchSnapshot();
  });

  it("should call callback correctly", function () {
    const mock = jest.fn();
    render(<Button onClick={mock} />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
