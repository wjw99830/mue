import { Watcher } from './watcher';

export class Dep {
  private subs: Watcher[] = [];
  public notify() {
    const subs = this.subs;
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
  public subscribedBy(w: Watcher) {
    if (!this.subs.includes(w)) {
      this.subs.push(w);
      w.subscribe(this);
    }
  }
}
