import { Watcher, watcherQ } from './watcher';

export class Dep {
  private subs: Watcher[] = [];
  public notify() {
    const subs = this.subs;
    if (watcherQ.length === 0) {
      Promise.resolve().then(() => {
        while(watcherQ.length > 0) {
          const watcher = watcherQ.shift() as Watcher;
          watcher.run();
        }
      });
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      watcherQ.push(subs[i]);
    }
    this.subs = [];
  }
  public subscribedBy(w: Watcher) {
    if (!this.subs.includes(w)) {
      this.subs.push(w);
      w.subscribe(this);
    }
  }
}
