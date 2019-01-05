import { Component, ComponentConstructor } from '@/instance/base';
import { isString } from '@/utils';
import { VNode, VNodeData, VNodeChild } from './vnode';
import { observe } from '@/observe/observer';

export const h = (tagOrComponent: string | ComponentConstructor, data: VNodeData, children: VNodeChild[]) => {
  let vnode: VNode;
  const vnodeChildren = children.map((child: VNodeChild) => {
    return isString(child) ? new VNode(undefined, undefined, undefined, child as string) : child;
  }).filter((child: VNodeChild) => child) as VNode[];
  if (isString(tagOrComponent)) {
    const tag = tagOrComponent as string;
    vnode = new VNode(tag, data, vnodeChildren);
  } else {
    const comp = tagOrComponent as ComponentConstructor;
    const vm = new comp() as Component;
    observe(vm);
    vm.$slot = vnodeChildren;
    vnode = vm.getVNode() as VNode;
  }
  return vnode;
};
