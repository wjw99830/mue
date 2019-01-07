import { Props, VNode, VNodeChild } from '@/vdom/vnode';
import { Watcher } from '@/observe/watcher';

// interface ComponentFunction<P extends Props> {
//   (props: P, children: VNodeChild[]): VNode;
// }
type ComponentFunction = (props: any, children: VNodeChild[]) => VNode;
type AppFunction = () => VNode;
interface ComponentFields {
  $watcher?: Watcher;
  $vnode?: VNode;
  beforeCreate?: () => void;
  created?: () => void;
  mounted?: () => void;
  beforeUpdate?: () => void;
  updated?: () => void;
}
export type Component = ComponentFunction & ComponentFields;
export type App = AppFunction & ComponentFields;
