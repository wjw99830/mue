import { ComponentConstructor } from './instance/base';
import { activateComponent } from './observe/observer';

export function Wie(app: ComponentConstructor) {
  const ins = new app();
  return activateComponent(ins);
}
export { h } from './vdom/create-element';
export { Component } from './instance/base';
export { nextTick } from './utils/nextTick';
export { Props, VNodeData, VNode } from './vdom/vnode';
export { observe } from './observe/observer';
