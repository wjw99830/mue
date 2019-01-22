import { watcherQ, hasParent } from './watcher';
export class Dep {
    constructor() {
        this.subs = [];
    }
    notify() {
        const subs = this.subs;
        if (watcherQ.length === 0) {
            Promise.resolve().then(() => {
                while (watcherQ.length > 0) {
                    const watcher = watcherQ.shift();
                    watcher.run();
                }
            });
        }
        for (let i = 0, l = subs.length; i < l; i++) {
            if (!watcherQ.includes(subs[i]) && !hasParent(subs[i])) {
                watcherQ.push(subs[i]);
            }
        }
        this.subs = [];
    }
    subscribedBy(w) {
        if (!this.subs.includes(w)) {
            this.subs.push(w);
            w.subscribe(this);
        }
    }
}
//# sourceMappingURL=dep.js.map