import { VNode } from '../vdom/vnode';
import { observe, createWatcher } from '../observe/observer';
import { hasOwn } from '../utils';
export type App = () => VNode;
export type Component = (props: any) => VNode;
export type InnerStateComponent = (state: any, props: any) => VNode;
declare type Reset = (() => (props: any) => VNode) & { $name?: string };
declare type Init = (initialState: any, component: InnerStateComponent) => Reset;
export const init: Init = (initialState: any, component: InnerStateComponent) => {
  const reset: Reset = () => {
    const state = observe(initialState);
    return (props: any) => component(state, props);
  };
  reset.$name = 'reset';
  return reset;
};
export const use = (reset: Reset | Component, props: any = {}) => {
  if (hasOwn(reset, '$name')) {
    const initialized = (reset as Reset)();
    return createWatcher(initialized, props).$vnode;
  } else {
    return createWatcher(reset as Component, props).$vnode;
  }
};
