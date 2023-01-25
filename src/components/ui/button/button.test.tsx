import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Button } from "./button";

describe("ui component: Button", () => {
  it("renders correctly with text", () => {
    const button = renderer.create(<Button text="test" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("renders correctly without text", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("renders correctly with disabled state", () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("renders correctly with loader state", () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("get callback correctly with button click", () => {
    const handleClickMock = jest.fn();
    render(<Button onClick={handleClickMock} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClickMock).toHaveBeenCalled();
  });
});
