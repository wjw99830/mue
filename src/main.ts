import { Wie } from './wie';
import { App, use } from './component';
import { h } from './vdom/create-element';
import './style.css';
import { Router, RouterView, RouterLink, LinkProps } from './router';
import { addPage } from './pages/add';

Router.routes = {
  '/add': addPage,
  '/': addPage,
};
const app: App = () => {
  const appAttr = { attrs: { id: 'bill-app' } };
  return h('div', appAttr, [
    h('header', {}, []),
    h('aside', {}, [
      use(RouterLink, { to: '/add', text: '添加' } as LinkProps),
      use(RouterLink, { to: '/query', text: '查询' } as LinkProps),
    ]),
    use(RouterView),
  ]);
};
Wie(app)('#app');
