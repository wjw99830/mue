import { VNode } from './vnode';
import { has } from '@/utils';

export interface PatchAction {
  
}
export const patchQ: PatchAction[] = [];

export const patch = (oldVNode: VNode | Node, newVNode: VNode) => {
  if (has(oldVNode, 'nodeType')) {
    const node = oldVNode as Node;
    patchQ.push({
      type: 
    })
  }
}
