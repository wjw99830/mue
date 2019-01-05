import { Component } from './instance/base';
import { h } from './vdom/create-element';
import { Mue } from './mue';
class Child extends Component {
  private childName: string = 'its child.';
  public render() {
    return h('span', {
      on: {
        click: () => {
          this.childName += ' set';
        },
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
