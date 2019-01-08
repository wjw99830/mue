import { mount } from './vdom/mount';
import { App } from './component';

export function Wie(app: App) {
  return (sel: string) => {
    mount(sel, app);
  };
}
export { h } from './vdom/create-element';
export { Component, App, InnerStateComponent, init, use } from './component';
export { nextTick } from './utils/nextTick';
export { observe } from './observe/observer';
