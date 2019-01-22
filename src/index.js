import { mount } from './vdom/mount';
export const render = (app) => {
    return (sel) => {
        mount(sel, app);
    };
};
export { h } from './vdom/create-element';
export { init, use, activate, effect, } from './component';
export { nextTick } from './utils/nextTick';
export { observe } from './observe/observer';
export { Router, RouterLink, RouterView } from './router';
//# sourceMappingURL=index.js.map