import { use, init, StatefulComponent } from '../component';
import { h } from '../vdom/create-element';
import { Router } from '.';
const defaultComponent = () => h('div', { attrs: { class: 'router-view' } });
const view: StatefulComponent = (state: any = {}, props: any = {}) => {
  const component = Router.routes[Router.state.path] || props.defaultComponent || defaultComponent;
  return use(component);
};
export const RouterView = init({}, view);
