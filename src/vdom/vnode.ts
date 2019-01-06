import { createElement, createTextNode } from '../utils/domapi';
import { isUndef, isDef, isString } from '../utils';
import { ownNames, keys } from '../utils/iterators';

export class VNode {
  public el: Node | void = undefined;
  public key: string | void = undefined;
  constructor(
    public tag?: string,
    public data: VNodeData<Props> = {},
    public children: VNode[] = [],
    public text?: string,
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
    this.el = node;
    return node;
  }
  private setAttributes(el: HTMLElement) {
    const data = this.data as VNodeData<Props>;
    if (isDef(data.attrs)) {
      const attrs = data.attrs as Attrs;
      for (const attrName of ownNames(attrs)) {
        el.setAttribute(attrName, attrs[attrName].toString());
      }
    }
  }
  private setProperties(el: HTMLElement) {
    const data = this.data as VNodeData<Props>;
    if (isDef(data.props)) {
      const props = data.props as Props;
      for (const propName of keys(props)) {
        (el as HTMLElement & Props)[propName] = props[propName];
      }
    }
  }
  private setClass(el: HTMLElement) {
    const data = this.data as VNodeData<Props>;
    if (isDef(data.class)) {
      const classes = data.class as Classes;
      for (const className of keys(classes)) {
        el.classList.add(className);
      }
    }
  }
  private setStyle(el: HTMLElement) {
    const data = this.data as VNodeData<Props>;
    if (isDef(data.style)) {
      const style = data.style as VNodeStyle;
      for (const styleName of keys(style)) {
        (el.style as CSSStyleDeclaration & Record<string, string>)[styleName] = style[styleName];
      }
    }
  }
  private registerEventListeners(el: HTMLElement) {
    const data = this.data as VNodeData<Props>;
    if (isDef(data.on)) {
      const on = data.on as On;
      for (const eventName of keys(on)) {
        el.addEventListener(eventName, on[eventName]);
      }
    }
  }
  private removeEventListeners(el: HTMLElement) {
    const data = this.data as VNodeData<Props>;
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
        if (!children[i]) {
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
export interface VNodeData<T extends Props> {
    attrs?: Attrs;
    props?: T;
    class?: Classes;
    style?: VNodeStyle;
    on?: On;
    key?: string | number;
}
export type VNodeChild = (VNode | string | null | void);
export type Attrs = Record<string, string | number | boolean>;
export type Props = Record<string, any>;
export type Classes = Record<string, boolean>;
export type VNodeStyle = Record<string, string>;
export type On = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void;
} & { [index: string]: (event: Event) => void };
