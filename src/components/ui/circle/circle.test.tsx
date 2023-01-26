import { type ReactElement } from "react";
import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

const checkWithSnapshot = (element: ReactElement) => {
  const tree = renderer.create(element).toJSON();
  expect(tree).toMatchSnapshot();
};

describe("ui component: Circle", () => {
  it("renders correctly without props", () => checkWithSnapshot(<Circle />));

  it("renders correctly with letter", () =>
    checkWithSnapshot(<Circle letter="test" />));

  it("renders correctly with head", () =>
    checkWithSnapshot(<Circle head="test" />));

  it("renders correctly with react-element in head", () =>
    checkWithSnapshot(<Circle head={<Circle />} />));

  it("renders correctly with tail", () =>
    checkWithSnapshot(<Circle tail="test" />));

  it("renders correctly with react-element in tail", () =>
    checkWithSnapshot(<Circle tail={<Circle />} />));

  it("renders correctly with index", () =>
    checkWithSnapshot(<Circle index={0} />));

  it("renders correctly with default state", () =>
    checkWithSnapshot(<Circle state={ElementStates.Default} />));

  it("renders correctly with changing state", () =>
    checkWithSnapshot(<Circle state={ElementStates.Changing} />));

  it("renders correctly with modified state", () =>
    checkWithSnapshot(<Circle state={ElementStates.Modified} />));
});
