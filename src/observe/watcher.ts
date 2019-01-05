import { Dep } from './dep';

export class Watcher {
  public static target: Watcher | void;
  private static id: number = 0;
  public id!: number;
  private deps: Dep[] = [];
  constructor(public update: () => void, lazy: boolean = false, private isRenderWatcher: boolean = false) {
    this.id = ++Watcher.id;
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
