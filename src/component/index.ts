import { VNode } from '../vdom/vnode';
import { observe, createWatcher } from '../observe/observer';
import { isDef, noop, isResetState, isOuterState } from '../utils';
import { microtask } from '../utils/nextTick';
export type App = () => VNode;
export type StatelessComponent = (props: any) => VNode;
export interface StatefulComponentFields {
  $name?: string;
  $type?: string;
  immediate?: boolean;
  always?: boolean;
  effect?(state: any): any;
}
export type InnerStateComponent = ((state: any, props: any) => VNode) & StatefulComponentFields;
export type OuterStateComponent = ((props: any) => VNode) & StatefulComponentFields;
export type ComponentGenerator = (props: any, init: boolean) => VNode;
export type ResetState = (() => ComponentGenerator) & { $type?: string };
export type StatefulComponent = OuterStateComponent | ResetState;
export type Component = OuterStateComponent | ResetState | StatelessComponent;
declare type Init = (initialState: any, component: InnerStateComponent) => ResetState;
export const init: Init = (initialState: any, component: InnerStateComponent) => {
  const reset: ResetState = () => {
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
export const activate = (component: OuterStateComponent) => {
  component.$type = 'outerstate';
  return component;
};
export const use = (reset: Component, props: any = {}) => {
  if (isResetState(reset)) {
    return createWatcher(reset(), props).$vnode;
  } else if (isOuterState(reset)) {
    return createWatcher(reset, props).$vnode;
  } else {
    return reset(props);
  }
};
interface EffectConfig {
  immediate?: boolean;
  always?: boolean;
  handler?(state: any): any;
}
export const effect = (component: OuterStateComponent | InnerStateComponent, config: EffectConfig) => {
  component.immediate = config.immediate || false;
  component.always = config.always || true;
  component.effect = config.handler || noop;
  return component;
};
