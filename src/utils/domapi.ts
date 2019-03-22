import { Props, VNodeStyle } from '@/vdom/vnode';

export const createElement = (tag: string): HTMLElement => document.createElement(tag);
export const createTextNode = (text: string): Text => document.createTextNode(text);
export const query = (sel: string) => document.querySelector(sel);
export const parentNode = (node: Node) => node.parentNode;
export const replaceChild = (parent: Node & ParentNode | null, newChild: Node, oldChild: Node) => {
  return parent !== null ? parent.replaceChild(newChild, oldChild) : null;
};
export const removeChild = (parent: Node, child: Node) => parent.removeChild(child);
export const insertBefore = (parent: Node, newChild: Node, sibling: Node | null) => {
  return parent.insertBefore(newChild, sibling);
};
export const nextSibling = (node: Node) => node.nextSibling;
export const setAttribute = (el: HTMLElement, attrName: string, val: string) => {
  return el.setAttribute(attrName, val);
};
export const removeAttribute = (el: HTMLElement, attrName: string) => el.removeAttribute(attrName);
export const setProp = (node: Props, propName: string, val: any) => node[propName] = val;
export const removeProp = (node: Props, propName: string) => node[propName] = null;
export const setClass = (el: Element, className: string) => el.classList.add(className);
export const removeClass = (el: Element, className: string) => el.classList.remove(className);
export const setStyle = (el: HTMLElement, name: string, val?: string | null) => {
  return (el.style as CSSStyleDeclaration & VNodeStyle)[name] = val || '';
};
export const removeStyle = (el: HTMLElement, name: string) => {
  return (el.style as CSSStyleDeclaration & VNodeStyle)[name] = '';
};
export const setTextContent = (node: Text, text: string) => node.textContent = text;
export const addEventListener = (
  el: HTMLElement,
  eventName: string,
  handler: (e: Event) => void,
  useCapture: boolean = false,
) => {
  el.addEventListener(eventName, handler, useCapture);
};
export const removeEventListener = (
  el: HTMLElement,
  eventName: string,
  handler: (e: Event) => void,
  useCapture: boolean = false,
) => {
  el.removeEventListener(eventName, handler, useCapture);
};
