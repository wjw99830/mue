# wie
```
npm install
```
# APIs
* observe: <T>(source: T) => T
```
const state = observe({ count: 0 });
console.log(state) // Proxy { count: 0 }
```
* h: (tag: string, data: VNodeData, children: Array<Vnode | string | null | void>) => VNode
```
h('div', {
  attrs: {
    id: 'my-id'
  },
  on: {
    click(e: Event) {}
  }
}, 'text node');
```
* use: (comp: Component, props: any) => VNode | ComponentGenerator
```
use(MyComponent, {
  myProp: 'prop'
});
```
* init: (initialState: any, comp: InnerStateComponent) => ResetState
```
const comp: InnerStateComponent = (state: MyState, props: any) => {
  return h('button', { on: { click() { state.count++ } } }, state.count.toString());
};
export default init({ count: 0 }, comp);
```
* activate: (comp: OuterStateComponent) => OuterStateComponent
```
const state = observe({ count: 0 });
const comp: OuterStateComponent = (props: any) => {
  return h('button', {}, state.count.toString());
}
export default activate(comp);
```
