import { VNode } from '../vdom/vnode';
import { observe, createWatcher } from '../observe/observer';
import { isDef, noop, isStateResetor } from '../utils';
import { microtask } from '../utils/nextTick';
export type App = () => VNode;
export type StatelessComponent = (props: any) => VNode;
export interface StatefulComponentFields {
  $type?: string;
  immediate?: boolean;
  always?: boolean;
  effect?(state: any): any;
}
export type StatefulComponent = ((state: any, props: any) => VNode) & StatefulComponentFields;
export type ComponentGenerator = (props: any, init: boolean) => VNode;
export type StateResetor = (() => ComponentGenerator) & { $type?: string };
export type Component = StateResetor | StatelessComponent;
export const init = (initialState: any, component: StatefulComponent) => {
  const reset: StateResetor = () => {
    const state = observe(initialState);
    return (props: any, initial: boolean = false) => {
      const vnode = component(state, props);
      if (initial && component.immediate && isDef(component.effect)) {
        microtask(() => {
          (component.effect as (state: any) => any)(state);
        });
      } else if (!initial && component.always && isDef(component.effect)) {
        microtask(() => {
          (component.effect as (state: any) => any)(state);
        });
      }
      return vnode;
    };
  };
  reset.$type = 'reset';
  return reset;
};
export const use = (reset: Component, props: any = {}) => {
  if (isStateResetor(reset)) {
    return createWatcher(reset(), props).$vnode;
  } else {
    return reset(props);
  }
};
interface EffectConfig {
  immediate?: boolean;
  always?: boolean;
  handler?(state: any): any;
}
export const effect = (component: StatefulComponent, config: EffectConfig) => {
  component.immediate = config.immediate || false;
  component.always = config.always || true;
  component.effect = config.handler || noop;
  return component;
};
