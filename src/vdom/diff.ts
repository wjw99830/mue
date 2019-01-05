import { VNode, Attrs, Props, Classes, VNodeStyle, VNodeData } from './vnode';
import { entries } from '@/utils/iterators';
import { has, isDef } from '@/utils';
import { patch } from './patch';
export const diffData = (old: VNode, vnode: VNode) => {
  const el = old.el as HTMLElement & Props;
  const oldData = old.data as VNodeData;
  const newData = vnode.data as VNodeData;
  const oldAttrs = oldData.attrs || {} as Attrs;
  const newAttrs = newData.attrs  || {} as Attrs;
  for (const [name, val] of entries(newAttrs)) {
    const valStr = val.toString();
    if (valStr !== oldAttrs[name].toString()) {
      el.setAttribute(name, valStr);
    }
  }
  for (const [name, val] of entries(oldAttrs)) {
    if (!has(newAttrs, name)) {
      el.removeAttribute(name);
    }
  }
  const oldProps = oldData.props || {} as Props;
  const newProps = newData.props || {} as Props;
  for (const [name, val] of entries(newProps)) {
    if (val !== oldProps[name]) {
      el[name] = val;
    }
  }
  for (const [name, val] of entries(oldProps)) {
    if (!has(newProps, name)) {
      el[name] = null;
    }
  }
  const oldClasses = oldData.class || {} as Classes;
  const newClasses = newData.class || {} as Classes;
  for (const [className, available] of entries(newClasses)) {
    if (available !== oldClasses[className]) {
      available ? el.classList.add(className) : el.classList.remove(className);
    }
  }
  for (const [className, available] of entries(oldClasses)) {
    if (!has(newClasses, className)) {
      el.classList.remove(className);
    }
  }
  const oldStyle = oldData.style || {} as VNodeStyle;
  const newStyle = newData.style || {} as VNodeStyle;
  for (const [name, val] of entries(newStyle)) {
    if (val !== oldStyle[name]) {
      const style = el.style as CSSStyleDeclaration & VNodeStyle;
      style[name] = val;
    }
  }
  for (const [name, val] of entries(oldStyle)) {
    if (!has(newStyle, name)) {
      const style = el.style as CSSStyleDeclaration & VNodeStyle;
      style[name] = '';
    }
  }
};
export const diffChildren = (old: VNode, vnode: VNode) => {
  const el = old.el as HTMLElement;
  for (const [index, child] of vnode.children.entries()) {
    patch(old.children[index], child);
  }
};
export const diffText = (old: VNode, vnode: VNode) => {
  const textNode = old.el as Node;
  if (old.text !== vnode.text) {
    textNode.textContent = vnode.text as string;
  }
}
export const diff = (old: VNode, vnode: VNode) => {
  if (isDef(vnode.text) && isDef(old.text)) {
    diffText(old, vnode);
  } else {
    diffData(old, vnode);
    diffChildren(old, vnode);
  }
  return old.el;
};
