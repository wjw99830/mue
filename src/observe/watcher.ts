import { Dep } from './dep';
import { VNode } from '../vdom/vnode';
import { lastItem, deleteItem } from '../utils';
export const watcherQ: Watcher[] = [];
export class Watcher {
  public static target: Watcher[] = [];
  public children: Watcher[] = [];
  public $vnode!: VNode;
  private deps: Dep[] = [];
  constructor(public update: (w: Watcher, initial: boolean) => void, lazy: boolean = false) {
    if (!lazy) {
      this.run(true);
    }
  }
  public subscribe(dep: Dep) {
    if (!this.deps.includes(dep)) {
      this.deps.push(dep);
    }
  }
  public run(initial: boolean = false) {
    pushWatcher(this);
    this.update(this, initial);
    popWatcher();
  }
}
export const pushWatcher = (w: Watcher) => {
  const parent = lastItem(Watcher.target);
  if (parent && !parent.children.includes(w)) {
    parent.children.push(w);
  }
  Watcher.target.push(w);
};
export const popWatcher = () => Watcher.target.pop();
export const isChild = (parent: Watcher, child: Watcher): boolean => {
  let flag: boolean = false;
  const children = parent.children;
  if (children.includes(child)) {
    flag = true;
  } else if (children.length > 0) {
    for (let i = 0, l = children.length; i < l; i++) {
      const item = children[i];
      flag = isChild(item, child);
    }
  }
  return flag;
};
export const hasParent = (w: Watcher) => {
  let flag: boolean = false;
  for (let i = 0, l = watcherQ.length; i < l; i++) {
    const item = watcherQ[i];
    if (isChild(item, w)) {
      flag = true;
      break;
    }
  }
  return flag;
};
