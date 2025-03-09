export type TestCase = {
  name: string;
  args: unknown;
  expected: unknown;
};

export type TestFunctionDescribe<T = (...args: any[]) => unknown> = {
  name: string;
  cases: [TestCase, ...TestCase[]];
  function: T;
};
