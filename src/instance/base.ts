import { Observer } from '@/observe/observer';
import { query } from '@/utils/domapi';
import { VNode, VNodeChild } from '@/vdom/vnode';
interface ConstructorOptions {
  el?: HTMLElement;
  props?: {
    [index: string]: any;
  };

}
export abstract class Component {
  [index: string]: any;
  public slot?: VNodeChild[];
  protected props: { [index: string]: any };
  private $observer?: Observer;
  private $el?: Node;
  private $vnode?: VNode;
  private $isMounted: boolean = false;
  constructor(options: ConstructorOptions = {}) {
    this.$el = options.el;
    this.props = options.props || {};
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
        const vnode = this.render();
        const newElm = vnode.createHTMLElement();
        vnode.bindElement(newElm);
        this.$vnode = vnode;
        const parent = el.parentNode as Node;
        parent.replaceChild(newElm, el);
        this.$el = newElm;
        this.$isMounted = true;
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
