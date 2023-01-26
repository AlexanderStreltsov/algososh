import { type ReactElement } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Button } from "./button";

const checkWithSnapshot = (element: ReactElement) => {
  const tree = renderer.create(element).toJSON();
  expect(tree).toMatchSnapshot();
};

describe("ui component: Button", () => {
  it("renders correctly with text", () =>
    checkWithSnapshot(<Button text="test" />));

  it("renders correctly without props", () => checkWithSnapshot(<Button />));

  it("renders correctly with disabled state", () =>
    checkWithSnapshot(<Button disabled />));

  it("renders correctly with loader state", () =>
    checkWithSnapshot(<Button isLoader />));

  it("get callback correctly with button click", () => {
    const handleClickMock = jest.fn();
    render(<Button onClick={handleClickMock} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClickMock).toHaveBeenCalled();
  });
});
