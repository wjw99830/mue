import * as Wie from './wie';
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
const app: Wie.App = () => Wie.h('div', {}, [
  Wie.use(nav),
  Wie.use(RouterView, {
    defaultComponent: queryPage,
  }),
]);
Wie.render(app)('#app');
