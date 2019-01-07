import { Dep } from './dep';
import { Watcher, watcherQ, popWatcher, pushWatcher } from './watcher';
import { Component } from '../instance/base';
import { patch } from '../vdom/patch';
import { VNode } from '../vdom/vnode';
import { keys } from '../utils/iterators';
import { isPrivateField, isFunction, isArray, isDef, isUndef } from '@/utils';

export const activateComponent = (target: Component) => {
  const ob = new Observer(target);
  const watcher = new Watcher(() => {
    const vnode = ob.proxy.render();
    patch(target.getVNode() as VNode, vnode);
    target.setVNode(vnode);
  });
  target.$observer = ob;
  target.$watcher = watcher;
  return ob.proxy;
};
export const observe = (target: object) => {
  const ob = new Observer(target);
  Object.defineProperty(target, '$observer', {
    enumerable: false,
    get() {
      return ob;
    },
  });
  return ob.proxy;
};
export class Observer {
  public proxy!: object & Record<string, any>;
  public target!: object & Record<string, any>;
  private deps: { [index: string]: Dep } = {};
  private dep?: Dep; // for Array
  constructor(target: object & Record<string, any>, private isProps: boolean = false) {
    this.target = target;
    this.proxy = this.defineReactive(target);
  }
  private defineReactive(obj: object & Record<string, any>) {
    const ob = this;
    let proxy: any;
    if (isArray(obj)) {
      const hasEffect = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
      for (const methodName of hasEffect) {
        (obj as Record<string, any>)[methodName] = new Proxy((obj as Record<string, any>)[methodName], {
          apply(target: any, ctx: any, args: any[]) {
            if (!isUndef(ob.dep)) {
              ob.dep.notify();
            }
            return target.call(ctx, ...args);
          },
        });
      }
      for (const [index, val] of obj.entries()) {
        if (typeof val === 'object') {
          obj[index] = new Observer(val).proxy;
        }
      }
      proxy = new Proxy(obj, {
        get(target: any[] & Record<string | number, any>, key: string | number) {
          const val = isFunction(target[key]) ? (target[key] as () => void).bind(target) : target[key];
          if (isPrivateField(key)) {
            return val;
          }
          if (!ob.dep) {
            ob.dep = new Dep();
          }
          if (Watcher.target.length > 0) {
            const w = popWatcher();
            ob.dep.subscribedBy(w as Watcher);
            pushWatcher(w as Watcher);
          }
          return val;
        },
        set(target: any[] & Record<string | number, any>, key: string | number, value: any): boolean {
          if (!ob.isProps) {
            target[key] = typeof value === 'object' ? new Observer(value).proxy : value;
            if (!isUndef(ob.dep)) {
              ob.dep.notify();
            }
          } else {
            console.warn(`You're trying to set a value which is defined as a Prop. Please set it in parent component.`);
          }
          return true;
        },
      });
    } else {
      for (const key of keys(obj)) {
        if (isPrivateField(key)) {
          continue;
        }
        this.deps[key] = new Dep();
        if (typeof obj[key] === 'object') {
          if (key !== 'props' && !this.isProps) {
            obj[key] = new Observer(obj[key]).proxy;
          } else {
            obj[key] = new Observer(obj[key], true).proxy;
          }
        }
      }
      proxy = new Proxy(obj, {
        get(target: any, key: string) {
          if (isPrivateField(key) || isFunction(target[key])) {
            return target[key];
          }
          if (!ob.deps[key]) {
            ob.deps[key] = new Dep();
          }
          if (Watcher.target.length > 0) {
            const w = popWatcher();
            ob.deps[key].subscribedBy(w as Watcher);
            pushWatcher(w as Watcher);
          }
          return target[key];
        },
        set(target: any, key: string, value: any): boolean {
          if (!ob.isProps) {
            target[key] = typeof value === 'object' ? new Observer(value).proxy : value;
            if (isDef(ob.deps[key])) {
              ob.deps[key].notify();
            }
          } else {
            console.warn(`You're trying to set a value which is defined as a Prop. Please set it in parent component.`);
          }
          return true;
        },
      });
    }
    return proxy;
  }
}
