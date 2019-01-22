import { mount } from './vdom/mount';
import { App } from './component';

export const render = (app: App) => {
  return (sel: string) => {
    mount(sel, app);
  };
}
export { h } from './vdom/create-element';
export { 
  App,
  Component,
  InnerStateComponent,
  OuterStateComponent,
  ResetState,
  ComponentGenerator,
  StatefulComponent,
  StatelessComponent,
  init,
  use,
  activate,
  effect,
} from './component';
export { nextTick } from './utils/nextTick';
export { observe } from './observe/observer';
