import { Dep } from './dep';
export const watcherQ: Watcher[] = [];
export class Watcher {
  public static target: Watcher | void;
  private deps: Dep[] = [];
  constructor(public update: () => void, lazy: boolean = false, private isRenderWatcher: boolean = false) {
    if (!lazy) {
      this.run();
    }
  }
  public subscribe(dep: Dep) {
    this.deps.push(dep);
  }
  public run() {
    if (this.isRenderWatcher) {
      this.update();
    } else {
      Watcher.target = this;
      this.update();
      Watcher.target = undefined;
    }
  }
}
