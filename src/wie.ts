import { ComponentConstructor } from './instance/base';
import { observe } from './observe/observer';

export function Wie(app: ComponentConstructor) {
  const ins = new app();
  return observe(ins);
}
export { h } from './vdom/create-element'
export { Component } from './instance/base'
export { nextTick } from './utils/nextTick'