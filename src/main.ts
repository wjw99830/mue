import { Wie, Component, h, App, observe } from './wie';
import { VNodeChild } from './vdom/vnode';
interface CompProps {
  prop: string;
}
const t = observe({
  tt: 's',
});
const comp: Component = (props: CompProps, children: VNodeChild[]) => h('p', {}, [
  'p text node and my prop is ' + props.prop,
  h('button', {
    on: {
      click: () => {
        t.tt += 's';
      },
    },
  },
  [t.tt, ...children]),
]);
const app: App = () => h('div', {}, [
  'div text node' + t.tt,
  h(comp, { props: { prop: 's' } as CompProps }, ['   im child for comp']),
]);
Wie(app)('#app');
