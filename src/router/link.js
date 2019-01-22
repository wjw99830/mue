import { h } from '../vdom/create-element';
import { Router } from '.';
export const RouterLink = (props) => h('a', {
    on: {
        click: (e) => {
            e.preventDefault();
            Router.push(props.to);
        },
    },
}, props.text);
//# sourceMappingURL=link.js.map