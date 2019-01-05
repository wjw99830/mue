import { VNode } from './vnode';
import { has, isUndef } from '@/utils';

export interface PatchAction {
  [index: string]: any;
}
export const patchQ: PatchAction[] = [];

export const patch = (oldVNode: VNode | Node = new VNode(), newVNode: VNode = new VNode()) => {
  if (isUndef(oldVNode)) {
    return;
  }
  if (has(oldVNode, 'nodeType')) {
    const node = oldVNode as Node;
    const parent = node.parentNode as Node;
    const newEl = newVNode.createHTMLElement();
    parent.replaceChild(newEl, node);
    newVNode.el = newEl;
  } else {
    const old = oldVNode as VNode;
    const oldEl = old.el as Node;
    if (!oldEl) {
      return;
    }
    const parent = oldEl.parentNode as Node;
    const newEl = newVNode.createHTMLElement();
    parent.replaceChild(newEl, oldEl);
    newVNode.el = newEl;
  }
};
