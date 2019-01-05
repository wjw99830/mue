import { noop } from '.';

export const nextTick = (fn: () => void = noop) => {
  Promise.resolve().then(() => {}).then(fn);
}