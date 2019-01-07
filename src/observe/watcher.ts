import { Dep } from './dep';
export const watcherQ: Watcher[] = [];
export class Watcher {
  public static target: Watcher[] = [];
  private deps: Dep[] = [];
  constructor(public update: () => void, lazy: boolean = false, private isRenderWatcher: boolean = false) {
    if (!lazy) {
      this.run();
    }
  }
  public subscribe(dep: Dep) {
    if (!this.deps.includes(dep)) {
      this.deps.push(dep);
    }
  }
  public run() {
    if (this.isRenderWatcher) {
      this.update();
    } else {
      pushWatcher(this);
      console.log('w')
      this.update();
      popWatcher();
    }
  }
}
export const pushWatcher = (w: Watcher) => {
  Watcher.target.push(w);
};
export const popWatcher = () => Watcher.target.pop();
