import { use, activate } from '../component';
import { h } from '../vdom/create-element';
import { Router } from '.';
const defaultComponent = () => h('div', { attrs: { class: 'router-view' } });
const view = (props = {}) => {
    const component = Router.routes[Router.state.path] || props.defaultComponent || defaultComponent;
    return use(component);
};
export const RouterView = activate(view);
//# sourceMappingURL=view.js.map