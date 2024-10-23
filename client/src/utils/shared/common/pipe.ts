// const reduce = (fn: Function, acc: any, iter?: any) => {
//   if (!iter) {
//     iter = acc[Symbol.iterator]();
//     acc = iter.next().value;
//   }
//   for (const item of iter) {
//     acc = fn(acc, item);
//   }
//   return acc;
// };
//
// function go(...args: unknown[]) {
//   return reduce((a: number, f: Function) => f(a), args);
// }
//
// export const pipe = (f: Function, ...fns: Function[]) => {
//   return <T>(...a: T[]) => go(f(...a), ...fns);
// };

// pipe 함수의 타입 정의
// function pipe<T>(...fns: Array<(arg: T) => T>): (initialValue: T) => T {
//   return (initialValue: T): T => {
//     return fns.reduce((acc, fn) => fn(acc), initialValue);
//   };
// }

// 여러 타입의 입력과 출력을 지원하는 범용 버전
// export function pipe<T, R>(...fns: Array<(arg: T) => R>): (initialValue: T) => R {
//   return (initialValue: T): R => {
//     return fns.reduce((acc, fn) => fn(acc as any), initialValue) as R;
//   };
// }


export function pipe<T, A>(f1: (arg: T) => A): (arg: T) => A;
export function pipe<T, A, B>(f1: (arg: T) => A, f2: (arg: A) => B): (arg: T) => B;
export function pipe<T, A, B, C>(f1: (arg: T) => A, f2: (arg: A) => B, f3: (arg: B) => C): (arg: T) => C;
export function pipe<T, A, B, C, D>(f1: (arg: T) => A, f2: (arg: A) => B, f3: (arg: B) => C, f4: (arg: C) => D): (arg: T) => D;
export function pipe(...fns: Array<(arg: any) => any>) {
  return (initialValue: any) => fns.reduce((acc, fn) => fn(acc), initialValue);
}