import { observe } from './observe/observer';
import { Component } from './instance/base';
import { h } from './vdom/create-element';
class MyComponent extends Component {
  private name: string = 'wjw';
  private age: number = 21;
  private profile = {
    like: 'code',
    unlike: 'read book',
  };
  constructor() {
    super();
  }
  public render() {
    return h('div', {
      attrs: {
        id: 'div-id'
      }
    }, ['div text node', h('span', {}, ['span text node'])]);
  }
}
observe(new MyComponent());
