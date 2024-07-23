type OperatorFunction = (a: number, b: number) => number;

// 연산자 타입 정의
type Operations = {
  [key: string]: OperatorFunction;
};

export const operations: Operations = {
  "+": (a: number, b: number) => a + b,
  "-": (a: number, b: number) => a - b,
  "×": (a: number, b: number) => a * b,
  "÷": (a: number, b: number) => a / b,
  "%": (a: number, b: number) => a % b,
  "^": (a: number, b: number) => Math.pow(a, b),
};
