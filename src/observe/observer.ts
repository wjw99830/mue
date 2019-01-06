import { Dep } from './dep';
import { Watcher } from './watcher';
import { Component } from '../instance/base';
import { patch } from '../vdom/patch';
import { VNode } from '../vdom/vnode';
import { keys } from '../utils/iterators';

export const observe = (target: Component) => {
  const ob = new Observer(target);
  const watcher = new Watcher(() => {
    const vnode = ob.proxy.render();
    patch(target.getVNode() as VNode, vnode);
    target.setVNode(vnode);
  });
  Object.defineProperty(target, '$watcher', {
    enumerable: false,
    get() {
      return watcher;
    },
  });
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
  constructor(target: object & Record<string, any>, private isProps: boolean = false) {
    this.target = target;
    this.proxy = this.defineReactive(target);
  }
  private defineReactive(obj: object & Record<string, any>) {
    const ob = this;
    for (const key of keys(obj)) {
      this.deps[key] = new Dep();
      if (typeof obj[key] === 'object') {
        if (key !== 'props' && !this.isProps) {
          obj[key] = new Observer(obj[key]).proxy;
        } else {
          obj[key] = new Observer(obj[key], true).proxy;
        }
      }
    }
    return new Proxy(obj, {
      get(target: any, key: string) {
        if (!ob.deps[key]) {
          ob.deps[key] = new Dep();
        }
        if (Watcher.target) {
          ob.deps[key].subscribedBy(Watcher.target);
        }
        return target[key];
      },
      set(target: any, key: string, value: any): boolean {
        if (!ob.isProps) {
          target[key] = typeof value === 'object' ? new Observer(value).proxy : value;
          ob.deps[key].notify();
        } else {
          console.warn(`You're trying to set a value which is defined as a Prop. Please set it in parent component.`);
        }
        return true;
      },
    });
  }
}
