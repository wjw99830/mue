import { InnerStateComponent, Component, use, init, effect, OuterStateComponent, activate } from '../component';
import { h } from '../vdom/create-element';
import { RouterState, Router } from '.';
interface ViewState {
  component: Component;
}
const defaultComponent = () => h('div', { attrs: { class: 'router-view' } });
const view: OuterStateComponent = () => {
  const component = Router.routes[Router.state.path] || defaultComponent;
  return use(component);
};
export const RouterView = activate(view);
