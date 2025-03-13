type EventListener<T> = (queue: T[]) => void | Promise<void>;

/**
 * A generic queue class that supports event listeners for various queue operations.
 *
 * @template T - The type of elements in the queue.
 */
export class Queue<T> {
  static EVENT_LISTENER_TYPES = {
    ON_ENQUEUE: 'onEnqueue',
    ON_DEQUEUE: 'onDequeue',
    ON_EMPTY: 'onEmpty',
    ON_DESTROY: 'onDestroy',
  } as const;

  public queue: T[];
  private eventListeners: {
    [key in (typeof Queue.EVENT_LISTENER_TYPES)[keyof typeof Queue.EVENT_LISTENER_TYPES]]: Set<
      EventListener<T>
    >;
  } = {
    [Queue.EVENT_LISTENER_TYPES.ON_ENQUEUE]: new Set(),
    [Queue.EVENT_LISTENER_TYPES.ON_DEQUEUE]: new Set(),
    [Queue.EVENT_LISTENER_TYPES.ON_EMPTY]: new Set(),
    [Queue.EVENT_LISTENER_TYPES.ON_DESTROY]: new Set(),
  };

  /**
   * Creates an instance of Queue.
   *
   * @param {T[]} [initialQueue=[]] - An optional initial array of elements to populate the queue.
   */
  constructor(initialQueue: T[] = []) {
    this.queue = initialQueue;
  }

  /**
   * Adds one or more elements to the end of the queue.
   *
   * @param {...T[]} args - The elements to add to the queue.
   */
  public enqueue(...args: T[]) {
    this.queue.push(...args);
    this.eventListeners[Queue.EVENT_LISTENER_TYPES.ON_ENQUEUE].forEach(
      (listener) => listener(this.queue),
    );
  }

  /**
   * Removes and returns the first element from the queue.
   *
   * @returns {T | undefined} The removed element, or undefined if the queue is empty.
   */
  public dequeue(): T | undefined {
    const item = this.queue.shift();

    this.eventListeners[Queue.EVENT_LISTENER_TYPES.ON_DEQUEUE].forEach(
      (listener) => listener(this.queue),
    );

    if (this.queue.length === 0) {
      this.eventListeners[Queue.EVENT_LISTENER_TYPES.ON_EMPTY].forEach(
        (listener) => listener(this.queue),
      );
    }

    return item;
  }

  /**
   * Returns the first element in the queue without removing it.
   *
   * @returns {T | undefined} The first element in the queue, or undefined if the queue is empty.
   */
  public peek(): T | undefined {
    return this.queue[0];
  }

  /**
   * Checks if the queue is empty.
   *
   * @returns {boolean} True if the queue is empty, false otherwise.
   */
  public isEmpty(): boolean {
    return this.queue.length === 0;
  }

  /**
   * Clears all elements from the queue.
   */
  public clear() {
    this.queue = [];
    this.eventListeners[Queue.EVENT_LISTENER_TYPES.ON_EMPTY].forEach(
      (listener) => listener(this.queue),
    );
  }

  /**
   * Returns a shallow copy of the queue's elements.
   *
   * @returns {T[]} An array containing the elements of the queue.
   */
  public values(): T[] {
    return this.queue.slice();
  }

  /**
   * Gets the number of elements in the queue.
   *
   * @returns {number} The number of elements in the queue.
   */
  public get size() {
    return this.queue.length;
  }

  /**
   * Adds an event listener for a specific event type.
   *
   * @param {keyof typeof Queue.EVENT_LISTENER_TYPES} event - The event type to listen for.
   * @param {EventListener<T>} listener - The event listener function.
   */
  public addEventListener(
    event: (typeof Queue.EVENT_LISTENER_TYPES)[keyof typeof Queue.EVENT_LISTENER_TYPES],
    listener: EventListener<T>,
  ) {
    this.eventListeners[event].add(listener);
  }

  /**
   * Removes an event listener for a specific event type.
   *
   * @param {keyof typeof Queue.EVENT_LISTENER_TYPES} event - The event type to stop listening for.
   * @param {EventListener<T>} listener - The event listener function to remove.
   */
  public removeEventListener(
    event: (typeof Queue.EVENT_LISTENER_TYPES)[keyof typeof Queue.EVENT_LISTENER_TYPES],
    listener: EventListener<T>,
  ) {
    this.eventListeners[event].delete(listener);
  }

  /**
   * Destroys the queue and clears all event listeners.
   */
  public destroy() {
    this.queue = [];
    this.eventListeners[Queue.EVENT_LISTENER_TYPES.ON_DESTROY].forEach(
      (listener) => listener(this.queue),
    );
    this.eventListeners = {
      onEnqueue: new Set(),
      onDequeue: new Set(),
      onEmpty: new Set(),
      onDestroy: new Set(),
    };
  }
}
