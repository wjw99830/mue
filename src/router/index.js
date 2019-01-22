import { observe } from '../observe/observer';
export class Router {
    static push(path) {
        history.pushState({ path }, path, path);
        if (Router.state.path !== path) {
            Router.state.path = path;
        }
    }
    static back() {
        history.back();
    }
    static go(num) {
        history.go(num);
    }
    static replace(path) {
        history.replaceState({ path }, path, path);
    }
}
Router.routes = {};
Router.state = observe({ path: location.pathname });
window.addEventListener('popstate', (e) => {
    if (Router.state.path !== location.pathname) {
        Router.state.path = location.pathname;
    }
});
export { RouterLink } from './link';
export { RouterView } from './view';
//# sourceMappingURL=index.js.map