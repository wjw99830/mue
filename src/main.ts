import { Wie, h } from './wie';
import { init, use, InnerStateComponent } from './component';
import { observe } from './observe/observer';
const data = observe({
  name: 'wjw',
});
const btn: InnerStateComponent = (state: any, props: any = { color: '#fff' }) => {
  const vnode = h('button', {
    class: {
      'btn-active': state.active,
    },
    style: {
      backgroundColor: props.color,
    },
    on: {
      click: () => {
        state.active = !state.active;
      },
    },
  }, `I'm button ${data.name}`);
  return vnode;
};

const btnapi = init({ active: false }, btn);
const page = () => {
  return h('div', {
    attrs: {
      id: 'my-app',
    },
    on: {
      click: () => {
        data.name += 'w';
      },
    },
  }, [
    h('p', {}, `I'm text node of P and my name is ${data.name}`),
    use(btnapi, {
      color: '#ccc',
    }),
  ]);
};
const app = () => use(page);
Wie(app)('#app');
