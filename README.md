# wie
```
npm install
```
# APIs
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
  return h('button', { on: { click() { state.count++ } } }, state.count);
};
export default init({ count: 0 }, comp);
```
