import { Queue } from '@/queue/index.ts';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  test('constructor should initialize the queue with the given values', () => {
    queue = new Queue([1, 2, 3]);
    expect(queue.values()).toEqual([1, 2, 3]);
  });

  test('enqueue', () => {
    queue.enqueue(1, 2, 3);
    expect(queue.values()).toEqual([1, 2, 3]);
  });

  test('dequeue', () => {
    queue.enqueue(1, 2, 3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.values()).toEqual([2, 3]);
  });

  test('peek', () => {
    queue.enqueue(1, 2, 3);
    expect(queue.peek()).toBe(1);
    expect(queue.values()).toEqual([1, 2, 3]);
  });

  test('isEmpty', () => {
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(1);
    expect(queue.isEmpty()).toBe(false);
  });

  test('clear', () => {
    queue.enqueue(1, 2, 3);
    queue.clear();
    expect(queue.isEmpty()).toBe(true);
  });

  test('size', () => {
    expect(queue.size).toBe(0);
    queue.enqueue(1, 2, 3);
    expect(queue.size).toBe(3);
  });

  test('addEventListener', () => {
    const onEnqueue = jest.fn();
    const onDequeue = jest.fn();
    const onEmpty = jest.fn();

    queue.addEventListener(Queue.EVENT_LISTENER_TYPES.ON_ENQUEUE, onEnqueue);
    queue.addEventListener(Queue.EVENT_LISTENER_TYPES.ON_DEQUEUE, onDequeue);
    queue.addEventListener(Queue.EVENT_LISTENER_TYPES.ON_EMPTY, onEmpty);

    queue.enqueue(1);
    expect(onEnqueue).toHaveBeenCalledWith([1]);

    queue.dequeue();
    expect(onDequeue).toHaveBeenCalledWith([]);
    expect(onEmpty).toHaveBeenCalledWith([]);
  });

  test('removeEventListener', () => {
    const onEnqueue = jest.fn();
    queue.addEventListener(Queue.EVENT_LISTENER_TYPES.ON_ENQUEUE, onEnqueue);
    queue.enqueue(1);
    expect(onEnqueue).toHaveBeenCalledTimes(1);

    queue.removeEventListener(Queue.EVENT_LISTENER_TYPES.ON_ENQUEUE, onEnqueue);
    queue.enqueue(2);
    expect(onEnqueue).toHaveBeenCalledTimes(1);
  });

  test('destroy', () => {
    const onDestroy = jest.fn();
    queue.addEventListener(Queue.EVENT_LISTENER_TYPES.ON_DESTROY, onDestroy);
    queue.enqueue(1, 2, 3);
    queue.destroy();
    expect(queue.isEmpty()).toBe(true);
    expect(onDestroy).toHaveBeenCalledWith([]);
  });
});
