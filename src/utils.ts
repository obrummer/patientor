export const assertNever = (x: never): never => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  throw Error("unhandled type" + x);
};
