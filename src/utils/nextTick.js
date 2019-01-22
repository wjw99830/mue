import { noop } from '.';
export const nextTick = (fn = noop) => {
    Promise.resolve().then(noop).then(fn);
};
export const microtask = (fn = noop) => {
    Promise.resolve().then(fn);
};
//# sourceMappingURL=nextTick.js.map