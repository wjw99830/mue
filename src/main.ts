import { Wie, Component, h, Props, VNodeData } from './wie';
import { Watcher, watcherQ } from './observe/watcher';
interface ChildProps extends Props {
  prop1: string;
}
class Child extends Component {
  private childName: string = 'its child.';
  private classToggle: boolean = true;
  public render() {
    return h('p', {
      on: {
        click: () => {
          this.childName += ' set';
          this.classToggle = !this.classToggle;
        },
      },
      class: {
        'my-btn': this.classToggle,
      },
    }, [`This component has a text node.${this.childName}, and my prop is ${this.props.prop1}`]);
  }
}
class MyComponent extends Component {
  private age: number = 21;
  private t: any[] = [{ name: 'node1' }, { name: 'node2' },{ name: 'node3' },{ name: 'node4' },{ name: 'node5' },{ name: 'node1' },{ name: 'node1' },{ name: 'node1' },{ name: 'node1' },{ name: 'node1' },{ name: 'node1' }];
  public render() {
    const vnode = h('div', {
      attrs: {
        id: 'div-id',
      },
      on: {
        click: () => {
          this.t[1].name += 'n'
        },
      },
    }, [
      h('p', {}, ['p text node;<div>im strong</div>']),
      // h(Child, {
      //   props: {
      //     prop1: 'hey',
      //   },
      // } as VNodeData<ChildProps>),
      ...this.t.map((item: any, index: number) => h('p', {}, [item.name])),
    ]);
    return vnode; 
  }
}
const app = Wie(MyComponent);
app.$mount('#app');
