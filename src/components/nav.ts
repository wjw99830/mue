import { StatefulComponent, init, use } from '@/component';
import { h } from '@/vdom/create-element';
import { RouterLink } from '@/router';
interface NavState {
  menuDisplayed: boolean;
}
export const navComp: StatefulComponent = (state: NavState) => {
  return h('nav', {}, [
    h('span', {
      on: {
        click() {
          state.menuDisplayed = !state.menuDisplayed;
        },
      },
    }, 'nav'),
    h('div', {
      style: {
        display: state.menuDisplayed ? 'flex' : 'none',
      },
      on: {
        click() {
          state.menuDisplayed = false;
        },
      },
    }, [
      use(RouterLink, {
        to: '/add',
        text: '添加',
      }),
      use(RouterLink, {
        to: '/query',
        text: '查询',
      }),
    ]),
  ]);
};
export const nav = init({ menuDisplayed: false } as NavState, navComp);
