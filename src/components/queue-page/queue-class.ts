interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getTailElement: () => T | null;
  getElements: () => (T | null)[];
  getLength: () => number;
  clear: () => void;
}

class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = [...Array(size)].map(() => null);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.tail = this.length === 0 ? 0 : (this.tail + 1) % this.size;
    this.container[this.tail] = item;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head] = null;
    this.head = (this.head + 1) % this.size;
    this.length--;

    if (this.isEmpty()) {
      this.head = 0;
      this.tail = 0;
    }
  };

  peak = (): T | null => this.container[this.head];

  getTailElement = (): T | null => this.container[this.tail];

  isEmpty = () => this.length === 0;

  getElements = () => this.container;

  getLength = () => this.length;

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = [...Array(this.size)].map(() => null);
  };
}

export default Queue;
