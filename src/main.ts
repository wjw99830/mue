import { observe } from './observe/observer';
import { Component } from './instance/base';
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
    console.log(`My name is ${this.name}, and my age is ${this.age}`);
    console.log(this);
    console.log(this.profile.like);
  }
}
observe(new MyComponent());
