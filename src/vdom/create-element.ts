import { Component } from '@/instance/base';
import { isString } from '@/utils';
import { VNode, VNodeData, VNodeChild } from './vnode';

export const h = (tagOrComponent: string | Component, data: VNodeData, children: VNodeChild[]) => {
  let vnode: VNode;
  const vnodeChildren = children.map((child: VNodeChild) => {
    return isString(child) ? new VNode(undefined, undefined, undefined, child as string) : child;
  });
  if (isString(tagOrComponent)) {
    const tag = tagOrComponent as string;
    vnode = new VNode(tag, data, vnodeChildren);
  } else {
    const vm = tagOrComponent as Component;
    vm.slot = vnodeChildren;
    vnode = vm.render();
  }
  return vnode;
}
