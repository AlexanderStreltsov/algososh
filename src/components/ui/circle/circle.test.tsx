import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("ui component: Circle", () => {
  it("renders correctly without props", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with letter", () => {
    const circle = renderer.create(<Circle letter="test" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with head", () => {
    const circle = renderer.create(<Circle head="test" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with react-element in head", () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with tail", () => {
    const circle = renderer.create(<Circle tail="test" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with react-element in tail", () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with index", () => {
    const circle = renderer.create(<Circle index={0} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with default state", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with changing state", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders correctly with modified state", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
});
