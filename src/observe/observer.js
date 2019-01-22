import { Dep } from './dep';
import { Watcher, popWatcher, pushWatcher } from './watcher';
import { patch } from '../vdom/patch';
import { keys } from '../utils/iterators';
import { isFunction, isArray, isDef, isUndef, warn, easyCopy } from '../utils';
export const createWatcher = (comp, props) => {
    return new Watcher((w, init = false) => {
        const vnode = comp(props, init);
        patch(w.$vnode, vnode);
        w.$vnode = vnode;
    });
};
export const observe = (target) => {
    const copy = easyCopy(target);
    const ob = new Observer(copy);
    return ob.proxy;
};
export class Observer {
    constructor(target, isProps = false) {
        this.isProps = isProps;
        this.deps = {};
        this.proxy = this.defineReactive(target);
    }
    defineReactive(obj) {
        const ob = this;
        let proxy;
        if (isArray(obj)) {
            const hasEffect = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
            for (const methodName of hasEffect) {
                obj[methodName] = new Proxy(obj[methodName], {
                    apply(target, ctx, args) {
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
                get(target, key) {
                    const val = isFunction(target[key]) ? target[key].bind(target) : target[key];
                    if (!ob.dep) {
                        ob.dep = new Dep();
                    }
                    if (Watcher.target.length > 0) {
                        const w = popWatcher();
                        ob.dep.subscribedBy(w);
                        pushWatcher(w);
                    }
                    return val;
                },
                set(target, key, value) {
                    if (!ob.isProps) {
                        target[key] = typeof value === 'object' ? new Observer(value).proxy : value;
                        if (!isUndef(ob.dep)) {
                            ob.dep.notify();
                        }
                    }
                    else {
                        warn(`You're trying to set a value which is defined as a Prop. Please set it in parent component.`);
                    }
                    return true;
                },
            });
        }
        else {
            for (const key of keys(obj)) {
                this.deps[key] = new Dep();
                if (typeof obj[key] === 'object') {
                    obj[key] = new Observer(obj[key]).proxy;
                }
            }
            proxy = new Proxy(obj, {
                get(target, key) {
                    if (isFunction(target[key])) {
                        return target[key];
                    }
                    if (!ob.deps[key]) {
                        ob.deps[key] = new Dep();
                    }
                    if (Watcher.target.length > 0) {
                        const w = popWatcher();
                        ob.deps[key].subscribedBy(w);
                        pushWatcher(w);
                    }
                    return target[key];
                },
                set(target, key, value) {
                    if (!ob.isProps) {
                        target[key] = typeof value === 'object' ? new Observer(value).proxy : value;
                        if (isDef(ob.deps[key])) {
                            ob.deps[key].notify();
                        }
                    }
                    else {
                        warn(`You're trying to set a value which is defined as a Prop. Please set it in parent component.`);
                    }
                    return true;
                },
            });
        }
        return proxy;
    }
}
//# sourceMappingURL=observer.js.map