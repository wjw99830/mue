import { createWatcher } from './observe/observer';
import { App } from './component/func';
import { mount } from './vdom/mount';

export function Wie(app: App) {
  app.$watcher = createWatcher(app);
  return (sel: string) => {
    mount(sel, app);
  };
}
export { h } from './vdom/create-element';
export { Component, App } from './component/func';
export { nextTick } from './utils/nextTick';
export { Props, VNodeChild } from './vdom/vnode';
export { observe } from './observe/observer';
