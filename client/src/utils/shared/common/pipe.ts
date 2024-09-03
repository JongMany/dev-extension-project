const reduce = (fn: Function, acc: any, iter?: any) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const item of iter) {
    acc = fn(acc, item);
  }
  return acc;
};

function go(...args: unknown[]) {
  return reduce((a: number, f: Function) => f(a), args);
}

export const pipe = (f: Function, ...fns: Function[]) => {
  return <T>(...a: T[]) => go(f(...a), ...fns);
};