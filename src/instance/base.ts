import { Observer } from '@/observe/observer';
interface ConstructorOptions {
  el?: HTMLElement;
  props?: {
    [index: string]: any;
  };

}
export abstract class Component {
  [index: string]: any;
  protected props: { [index: string]: any };
  private $observer?: Observer;
  private $el?: HTMLElement;
  constructor(options: ConstructorOptions = {}) {
    this.$el = options.el;
    this.props = options.props || {};
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
  public abstract render(): void;
}
