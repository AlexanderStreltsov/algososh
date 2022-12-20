interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peak: () => T | null;
  getElements: () => T[];
  getSize: () => number;
}

class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T) => {
    this.container.push(item);
  };

  pop = () => {
    this.getSize() && this.container.pop();
  };

  clear = () => {
    this.container = [];
  };

  peak = () => {
    const length = this.getSize();
    return length ? this.container[length - 1] : null;
  };

  getElements = () => [...this.container];

  getSize = () => this.container.length;
}

export default Stack;
