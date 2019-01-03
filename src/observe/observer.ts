import { Dep } from './dep';
import { Watcher } from './watcher';
import { Component } from '@/instance/base';

export const observe = (target: Component) => {
  const ob = new Observer(target);
  const watcher = new Watcher(target.render.bind(ob.proxy));
  Object.defineProperty(target, '$watcher', {
    enumerable: false,
    get() {
      return watcher;
    },
  });
  return ob.proxy;
};
export class Observer {
  public proxy!: Component;
  private deps: { [index: string]: Dep } = {};
  constructor(target: Component) {
    this.proxy = this.defineReactive(target);
    // const ob = this;
    // Object.defineProperty(target, '$observer', {
    //   enumerable: false,
    //   get() {
    //     return ob;
    //   },
    // });
  }
  private defineReactive(obj: Component) {
    const ob = this;
    for (const key of Object.keys(obj)) {
      this.deps[key] = new Dep();
      if (typeof obj[key] === 'object') {
        obj[key] = new Observer(obj[key]).proxy;
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
        target[key] = typeof value === 'object' ? ob.defineReactive(value) : value;
        ob.deps[key].notify();
        return true;
      },
    });
  }
}
