import { query } from '@/utils/domapi';
import { VNode, VNodeChild, Props } from '@/vdom/vnode';
import { Watcher } from '@/observe/watcher';
import { patch } from '@/vdom/patch';
import { observe, Observer } from '@/observe/observer';
interface ConstructorOptions {
  el?: HTMLElement;
  props?: {
    [index: string]: any;
  };

}
export interface ComponentConstructor {
  new (props?: Props): Component;
}
export abstract class Component {
  [index: string]: any;
  public $slot: VNodeChild[] = [];
  protected props: Props;
  private $vnode: VNode | void = undefined;
  private $el: Node | void = undefined;
  private $isMounted: boolean = false;
  constructor(props?: Props) {
    this.props = props || {};
    Object.keys(this).forEach((key: string) => {
      Object.defineProperty(this, key, {
        enumerable: false
      });
    })
  }
  public setVNode(vnode: VNode) {
    this.$vnode = vnode;
  }
  public getVNode(): VNode | void {
    return this.$vnode;
  }
  public setEl(el: Node) {
    this.$el = el;
  }
  public getEl(): Node | void {
    return this.$el;
  }
  public $mount(id: string) {
    if (this.$isMounted) {
      return;
    }
    if (id.match(/^#/g)) {
      const el = query(id);
      if (el === null) {
        console.warn(`Provided Selector (${id}) is not exsisted in DOM.`);
        return;
      } else {
        new Watcher(() => {
          const vnode = this.getVNode() as VNode;
          patch(el, vnode);
          this.$observer.target.setEl(vnode.el as Node);
        }, false, true);
      }
    } else {
      console.warn(`Please provide a selector for id.`);
    }
  }
  public beforeCreate() {
    console.log('call beforeCreate.');
  }
  public created() {
    console.log('call created.');
  }
  public mounted() {
    console.log('call mounted.');
  }
  public updated() {
    console.log('call updated.');
  }
  public abstract render(): VNode;
}
