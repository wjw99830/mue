import { query } from '../utils/domapi';
import { VNode, VNodeChild, Props } from '../vdom/vnode';
import { Watcher } from '../observe/watcher';
import { patch } from '../vdom/patch';
import { Observer } from '@/observe/observer';
import { isUndef, isDef } from '@/utils';

export abstract class Component {
  [index: string]: any;
  public $slot: VNodeChild[] = [];
  public $observer!: Observer;
  public $watcher!: Watcher;
  protected props: Props;
  private $vnode!: VNode;
  private $el: Node | void = undefined;
  private $isMounted: boolean = false;
  constructor(props?: Props) {
    this.props = props || {};
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
        const renderWatcher = new Watcher(() => {
          const vnode = this.getVNode() as VNode;
          patch(el, vnode);
          this.$observer.target.setEl(vnode.el as Node);
        }, false /* lazy */, true /* renderOnly */);
      }
    } else {
      console.warn(`Please provide a selector with id.`);
    }
  }
  public $destroy() {
    function _destroy(vnode: VNode) {
      delete vnode.el;
      for (const child of vnode.children) {
        if (isDef(child.componentInstance)) {
          const ins = vnode.componentInstance as Component;
          ins.$destroy();
          delete vnode.componentInstance;
        } else {
          _destroy(child);
        }
      }
    }
    delete this.$observer;
    delete this.$watcher;
    delete this.$el;
    _destroy(this.$vnode as VNode);
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
export type ComponentConstructor = new (props?: Props) => Component;
