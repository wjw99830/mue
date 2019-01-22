import { observe, createWatcher } from '../observe/observer';
import { isDef, noop, isResetState, isOuterState } from '../utils';
import { microtask } from '../utils/nextTick';
export const init = (initialState, component) => {
    const reset = () => {
        const state = observe(initialState);
        return (props, initial = false) => {
            const vnode = component(state, props);
            if (initial && component.immediate && isDef(component.effect)) {
                microtask(() => {
                    component.effect(state);
                });
            }
            else if (!initial && component.always && isDef(component.effect)) {
                microtask(() => {
                    component.effect(state);
                });
            }
            return vnode;
        };
    };
    reset.$type = 'reset';
    return reset;
};
export const activate = (component) => {
    component.$type = 'outerstate';
    return component;
};
export const use = (reset, props = {}) => {
    if (isResetState(reset)) {
        return createWatcher(reset(), props).$vnode;
    }
    else if (isOuterState(reset)) {
        return createWatcher(reset, props).$vnode;
    }
    else {
        return reset(props);
    }
};
export const effect = (component, config) => {
    component.immediate = config.immediate || false;
    component.always = config.always || true;
    component.effect = config.handler || noop;
    return component;
};
//# sourceMappingURL=index.js.map