import { Component } from './instance/base';
import { h } from './vdom/create-element';
import { Mue } from './mue';
class Child extends Component {
  private childName: string = 'its child.';
  private classToggle: boolean = true;
  public render() {
    return h('button', {
      on: {
        click: () => {
          this.childName += ' set';
          this.classToggle = !this.classToggle
        },
      },
      class: {
        'my-btn': this.classToggle,
      },
    }, [`This component has a text node '${this.childName}'`]);
  }
}
class MyComponent extends Component {
  private name: string = 'wjw';
  private age: number = 21;
  constructor() {
    super();
  }
  public render() {
    return h('div', {
      attrs: {
        id: 'div-id',
      },
    }, [h('p', {}, ['p text node' + this.age]), h(Child, {}, [])]);
  }
}
Mue(MyComponent).$mount('#app');
