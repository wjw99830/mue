import { lastItem } from '../utils';
export const watcherQ = [];
export class Watcher {
    constructor(update, lazy = false) {
        this.update = update;
        this.children = [];
        this.deps = [];
        if (!lazy) {
            this.run(true);
        }
    }
    subscribe(dep) {
        if (!this.deps.includes(dep)) {
            this.deps.push(dep);
        }
    }
    run(initial = false) {
        pushWatcher(this);
        this.update(this, initial);
        popWatcher();
    }
}
Watcher.target = [];
export const pushWatcher = (w) => {
    const parent = lastItem(Watcher.target);
    if (parent && !parent.children.includes(w)) {
        parent.children.push(w);
    }
    Watcher.target.push(w);
};
export const popWatcher = () => Watcher.target.pop();
export const isChild = (parent, child) => {
    let flag = false;
    const children = parent.children;
    if (children.includes(child)) {
        flag = true;
    }
    else if (children.length > 0) {
        for (let i = 0, l = children.length; i < l; i++) {
            const item = children[i];
            flag = isChild(item, child);
        }
    }
    return flag;
};
export const hasParent = (w) => {
    let flag = false;
    for (let i = 0, l = watcherQ.length; i < l; i++) {
        const item = watcherQ[i];
        if (isChild(item, w)) {
            flag = true;
            break;
        }
    }
    return flag;
};
//# sourceMappingURL=watcher.js.map