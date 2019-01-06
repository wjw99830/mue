import { Wie, Component, h, Props, VNodeData } from './wie';
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
  private t: string = '<input type="text" />';
  constructor() {
    super();
  }
  public render() {
    return h('div', {
      attrs: {
        id: 'div-id',
      },
      on: {
        click: () => {
          this.t += ' click';
        },
      },
    }, [h('p', {}, ['p text node;<div>im strong</div>' + this.age]), h(Child, {
      props: {
        prop1: this.t,
      },
    } as VNodeData<ChildProps>, [])]);
  }
}
Wie(MyComponent).$mount('#app');
