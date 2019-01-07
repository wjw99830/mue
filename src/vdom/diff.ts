import { VNode, Attrs, Props, Classes, VNodeStyle, VNodeData } from './vnode';
import { entries } from '../utils/iterators';
import { has, isDef, isUndef } from '../utils';
import { patch } from './patch';
import * as dom from '../utils/domapi';

export const diffData = (old: VNode, vnode: VNode) => {
  const el = old.el as HTMLElement & Props;
  const oldData = old.data as VNodeData<Props>;
  const newData = vnode.data as VNodeData<Props>;
  const oldAttrs = (oldData.attrs || {}) as Attrs;
  const newAttrs = (newData.attrs  || {}) as Attrs;
  for (const [name, val] of entries(newAttrs)) {
    const valStr = val.toString();
    if (valStr !== oldAttrs[name].toString()) {
      dom.setAttribute(el, name, valStr);
    }
  }
  for (const [name, val] of entries(oldAttrs)) {
    if (!has(newAttrs, name)) {
      dom.removeAttribute(el, name);
    }
  }
  const oldProps = (oldData.props || {}) as Props;
  const newProps = (newData.props || {}) as Props;
  for (const [name, val] of entries(newProps)) {
    if (val !== oldProps[name]) {
      dom.setProp(el, name, val);
    }
  }
  for (const [name, val] of entries(oldProps)) {
    if (!has(newProps, name)) {
      dom.removeProp(el, name);
    }
  }
  const oldClasses = (oldData.class || {}) as Classes;
  const newClasses = (newData.class || {}) as Classes;
  for (const [className, available] of entries(newClasses)) {
    if (available !== oldClasses[className]) {
      available ? dom.setClass(el, className) : dom.removeClass(el, className);
    }
  }
  for (const [className, available] of entries(oldClasses)) {
    if (!has(newClasses, className)) {
      dom.removeClass(el, className);
    }
  }
  const oldStyle = (oldData.style || {}) as VNodeStyle;
  const newStyle = (newData.style || {}) as VNodeStyle;
  for (const [name, val] of entries(newStyle)) {
    if (val !== oldStyle[name]) {
      dom.setStyle(el, name, val);
    }
  }
  for (const [name, val] of entries(oldStyle)) {
    if (!has(newStyle, name)) {
      dom.removeStyle(el, name);
    }
  }
};
export const diffChildren = (old: VNode, vnode: VNode) => {
  const el = old.el as HTMLElement;
  for (const [index, child] of vnode.children.entries()) {
    if (isUndef(old.children[index])) {
      el.appendChild(vnode.children[index].createHTMLElement());
    } else {
      patch(old.children[index], child);
    }
  }
  for (let i = vnode.children.length; i < old.children.length; i++) {
    if (isUndef(vnode.children[i])) {
      dom.removeChild(el, old.children[i].el as Node);
      delete old.children[i].el;
    }
  }
};
export const diffText = (old: VNode, vnode: VNode) => {
  const textNode = old.el as Text;
  if (old.text !== vnode.text) {
    dom.setTextContent(textNode, vnode.text || '');
  }
};
export const diff = (old: VNode, vnode: VNode) => {
  if (isDef(vnode.text) && isDef(old.text)) {
    diffText(old, vnode);
  } else {
    diffData(old, vnode);
    diffChildren(old, vnode);
  }
  return old.el;
};
