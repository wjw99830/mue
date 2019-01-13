import { Component } from '../component';
import { observe } from '@/observe/observer';

// interface RoutesItem {
//   component: Component;
//   components?: Component[];
//   redirect?: string;
//   children?: Routes;
// }
interface Routes {
  [path: string]: Component;
}
export interface RouterState {
  path: string;
}
export class Router {
  public static routes: Routes = {};
  public static state: RouterState = observe({ path: location.pathname });
  public static push(path: string) {
    history.pushState({ path }, path, path);
    if (Router.state.path !== path) {
      Router.state.path = path;
    }
  }
  public static back() {
    history.back();
  }
  public static go(num: number) {
    history.go(num);
  }
  public static replace(path: string) {
    history.replaceState({ path }, path, path);
  }
}
window.addEventListener('popstate', (e) => {
  if (Router.state.path !== location.pathname) {
    Router.state.path = location.pathname;
  }
});
export { RouterLink, LinkProps } from './link';
export { RouterView } from './view';
