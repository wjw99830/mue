import { noop } from '.';

export const nextTick = (fn: () => void = noop) => {
  Promise.resolve().then(noop).then(fn);
};
export const microtask = (fn: () => void = noop) => {
  Promise.resolve().then(fn);
};
