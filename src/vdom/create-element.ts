import { isString, isArray } from '../utils';
import { VNode, VNodeData, VNodeChild, Props } from './vnode';

export const h = (
  tag: string,
  data: VNodeData<Props> = {},
  children: VNodeChild[] | string = []) => {
  let vnodeChildren: VNode[];
  if (isArray(children)) {
    vnodeChildren = children.map((child: VNodeChild) => {
      return isString(child) ? new VNode(undefined, undefined, undefined, child as string) : child;
    }).filter((child: VNodeChild) => child) as VNode[];
  } else {
    vnodeChildren = [new VNode(undefined, undefined, undefined, children)];
  }
  return new VNode(tag, data, vnodeChildren);
};
