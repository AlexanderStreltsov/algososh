export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  prepend: (value: T) => void;
  append: (value: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (value: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  getHead: () => Node<T> | null;
  getTail: () => Node<T> | null;
  getElementsToArray: () => T[];
  getSize: () => number;
  setFromArray: (elements: T[]) => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  prepend = (value: T) => {
    const node = new Node(value, this.head);

    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }

    this.size++;
  };

  append = (value: T) => {
    const node = new Node(value);

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.size++;
  };

  deleteHead = () => {
    if (!this.head) {
      throw new Error("No elements in the list");
    }

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.size--;
  };

  deleteTail = () => {
    if (!this.tail) {
      throw new Error("No elements in the list");
    }

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let currentNode = this.head;

      while (currentNode !== null && currentNode.next) {
        if (!currentNode.next.next) {
          currentNode.next = null;
        } else {
          currentNode = currentNode.next;
        }
      }

      this.tail = currentNode;
    }

    this.size--;
  };

  addByIndex = (value: T, index: number) => {
    if (index === 0) {
      this.prepend(value);
    } else if (index > 0 && index < this.size) {
      const node = new Node(value);

      let currentNode = this.head;
      let currentIndex = 0;

      while (currentIndex < index && currentNode) {
        if (currentIndex === index - 1) {
          node.next = currentNode.next;
          currentNode.next = node;
        }

        currentNode = currentNode.next;
        currentIndex++;
      }

      this.size++;
    } else {
      throw new Error("Index out of list size");
    }
  };

  deleteByIndex = (index: number) => {
    if (this.size === 0) {
      throw new Error("No elements in the list");
    }

    if (index === 0) {
      this.deleteHead();
    } else if (index === this.size - 1) {
      this.deleteTail();
    } else if (index > 0 && index < this.size) {
      let currentNode = this.head;
      let prevNode = null;

      let i = 0;
      while (i < index) {
        prevNode = currentNode;
        if (currentNode) {
          currentNode = currentNode.next;
        }
        i++;
      }

      if (prevNode && currentNode) {
        prevNode.next = currentNode.next;
        this.size--;
      }
    } else {
      throw new Error("Index out of list size");
    }
  };

  getHead = () => this.head;

  getTail = () => this.tail;

  getElementsToArray = () => {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return nodes;
  };

  getSize = () => this.size;

  setFromArray = (elements: T[]) =>
    elements.forEach((element) => this.append(element));
}
