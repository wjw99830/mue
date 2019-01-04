import { createElement, createTextNode } from '@/utils/domapi';
import { isUndef, isDef, isString } from '@/utils';
import { ownNames, keys } from '@/utils/iterators';

export class VNode {
    private el?: Node;
    constructor(
      private tag?: string,
      private data?: VNodeData,
      private children?: VNodeChild[],
      private text?: string,
    ) {}
    public bindElement(el: Node) {
      this.el = el;
    }
    public createHTMLElement(): Node {
      let node: Text | HTMLElement;
      if (isUndef(this.tag) && isDef(this.text)) {
        node = createTextNode(this.text as string);
      } else {
        node = createElement(this.tag as string);
        if (isDef(this.data)) {
          this.setAttributes(node);
          this.setProperties(node);
          this.appendChildren(node);
          this.setClass(node);
          this.setStyle(node);
          this.registerEventListeners(node);
        }
      }
      return node;
    }
    private setAttributes(el: HTMLElement) {
      const data = this.data as VNodeData;
      if (isDef(data.attrs)) {
        const attrs = data.attrs as Attrs;
        for (const attrName of ownNames(attrs)) {
          el.setAttribute(attrName, attrs[attrName].toString());
        }
      }
    }
    private setProperties(el: HTMLElement) {
      const data = this.data as VNodeData;
      if (isDef(data.props)) {
        const props = data.props as Props;
        for (const propName of keys(props)) {
          (el as HTMLElement & Props)[propName] = props[propName];
        }
      }
    }
    private setClass(el: HTMLElement) {
      const data = this.data as VNodeData;
      if (isDef(data.class)) {
        const classes = data.class as Classes;
        for (const className of keys(classes)) {
          el.classList.add(className);
        }
      }
    }
    private setStyle(el: HTMLElement) {
      const data = this.data as VNodeData;
      if (isDef(data.style)) {
        const style = data.style as VNodeStyle;
        for (const styleName of keys(style)) {
          (el.style as CSSStyleDeclaration & Record<string, string>)[styleName] = style[styleName];
        }
      }
    }
    private registerEventListeners(el: HTMLElement) {
      const data = this.data as VNodeData;
      if (isDef(data.on)) {
        const on = data.on as On;
        for (const eventName of keys(on)) {
          el.addEventListener(eventName, on[eventName]);
        }
      }
    }
    private removeEventListeners(el: HTMLElement) {
      const data = this.data as VNodeData;
      if (isDef(data.on)) {
        const on = data.on as On;
        for (const eventName of keys(on)) {
          el.removeEventListener(eventName, on[eventName]);
        }
      }
    }
    private appendChildren(el: HTMLElement) {
      if (isDef(this.children)) {
        const children = this.children as VNodeChild[];
        for (let i = 0, l = children.length; i < l; i++) {
          if (children[i] === null) {
            continue;
          } else if (isString(children[i])) {
            const text = children[i] as string;
            const textNode = createTextNode(text);
            el.appendChild(textNode);
          } else {
            const vnode = children[i] as VNode;
            const element = vnode.createHTMLElement();
            el.appendChild(element);
          }
        }
      }
    }
}
// export const createTextVNode = (text: string): VNode => new VNode(undefined, undefined, undefined, text);
export interface VNodeData {
    attrs?: Attrs;
    props?: Props;
    class?: Classes;
    style?: VNodeStyle;
    on?: On;
    key?: string | number;
}
export type VNodeChild = (VNode | string | null | void);
type Attrs = Record<string, string | number | boolean>;
type Props = Record<string, any>;
type Classes = Record<string, boolean>;
type VNodeStyle = Record<string, string>;
type On = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void;
} & { [index: string]: (event: Event) => void };
