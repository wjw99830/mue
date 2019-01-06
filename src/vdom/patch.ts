import { VNode } from './vnode';
import { has, isDef, isUndef } from '../utils';
import { diff } from './diff';
import * as dom from '../utils/domapi';

export const equalVNode = (n1: VNode, n2: VNode) => n1.tag === n2.tag;

export const patch = (oldVNode: VNode | Node | void, newVNode: VNode = new VNode()) => {
  if (isUndef(oldVNode)) {
    return;
  }
  if (has(oldVNode as VNode | Node, 'nodeType')) {
    const node = oldVNode as Node;
    const parent = dom.parentNode(node);
    const newEl = newVNode.createHTMLElement();
    dom.replaceChild(parent, newEl, node);
    newVNode.el = newEl;
  } else {
    const old = oldVNode as VNode;
    if (equalVNode(old, newVNode)) {
      newVNode.el = diff(old, newVNode);
    } else {
      const oldEl = old.el as Node;
      if (!oldEl) {
        return;
      }
      const parent = dom.parentNode(oldEl);
      if (parent !== null) {
        if (isDef(newVNode)) {
          const el = newVNode.createHTMLElement();
          dom.insertBefore(parent, el, dom.nextSibling(oldEl));
          newVNode.el = el;
        }
        dom.removeChild(parent, oldEl);
      }
    }
  }
};
