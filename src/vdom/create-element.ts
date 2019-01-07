import { Component } from '../component/func';
import { isString } from '../utils';
import { VNode, VNodeData, VNodeChild, Props } from './vnode';
import { createWatcher } from '@/observe/observer';

export const h = (
  tagOrComponent: string | Component,
  data: VNodeData<Props> = {},
  children: VNodeChild[] = []) => {
  let vnode: VNode;
  const vnodeChildren = children.map((child: VNodeChild) => {
    return isString(child) ? new VNode(undefined, undefined, undefined, child as string) : child;
  }).filter((child: VNodeChild) => child) as VNode[];
  if (isString(tagOrComponent)) {
    const tag = tagOrComponent as string;
    vnode = new VNode(tag, data, vnodeChildren);
  } else {
    const comp = tagOrComponent as Component;
    comp.$watcher = createWatcher(comp, data.props, children);
    vnode = comp.$vnode as VNode;
  }
  return vnode;
};
