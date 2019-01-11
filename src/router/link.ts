import { StatelessComponent } from '../component';
import { h } from '../vdom/create-element';
import { Router } from '.';
export interface LinkProps {
  to: string;
  text: string;
}
export const RouterLink: StatelessComponent = (props: LinkProps) => h('a', {
  on: {
    click: (e: Event) => {
      e.preventDefault();
      Router.push(props.to);
    },
  },
}, props.text);
