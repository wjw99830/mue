import { Dep } from './dep';

export class Watcher {
  public static target: Watcher | void;
  private static id: number = 0;
  public id!: number;
  private deps: Dep[] = [];
  constructor(public update: () => void) {
    this.id = ++Watcher.id;
    this.run();
  }
  public subscribe(dep: Dep) {
    this.deps.push(dep);
  }
  public run() {
    Watcher.target = this;
    this.update();
    Watcher.target = undefined;
  }
}
