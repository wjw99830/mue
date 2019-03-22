import { VNode } from "./vdom/vnode";

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}