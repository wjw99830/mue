import * as Wie from './wie';
import { App, use } from './component';
import { h } from './vdom/create-element';
import './style.css';
import { Router, RouterView } from './router';
import { addPage } from './pages/add';
import { queryPage } from './pages/query';
import { nav } from './components/nav';

Router.routes = {
  '/add': addPage,
  '/query': queryPage,
  '/': queryPage,
};
const app: App = () => {
  return h('div', appAttr, [
    use(nav),
    use(RouterView, {
      defaultComponent: queryPage,
    }),
  ]);
};
document.addEventListener('deviceready', () => {
  Wie.render(app)('#app');
});
