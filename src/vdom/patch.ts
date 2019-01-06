import { VNode } from './vnode';
import { has, isDef } from '../utils';
import { diff } from './diff';

export const equalVNode = (n1: VNode, n2: VNode) => n1.tag === n2.tag;

export const patch = (oldVNode: VNode | Node = new VNode(), newVNode: VNode = new VNode()) => {
  if (has(oldVNode, 'nodeType')) {
    const node = oldVNode as Node;
    const parent = node.parentNode as Node;
    const newEl = newVNode.createHTMLElement();
    parent.replaceChild(newEl, node);
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
      const parent = oldEl.parentNode;
      if (parent !== null) {
        if (isDef(newVNode)) {
          const el = newVNode.createHTMLElement();
          parent.insertBefore(el, oldEl.nextSibling);
          newVNode.el = el;
        }
        parent.removeChild(oldEl);
      }
    }
  }
};
